import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import path from 'path';
import { NextResponse } from 'next/server';
import { createProductEntry, getProductsList } from '@/lib/products';
import type { ProductDocument } from '@/lib/products';

export const runtime = 'nodejs';

const MAX_HERO_COUNT = 1;
const MAX_GALLERY_COUNT = 10;
const MAX_DOCUMENT_COUNT = 8;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const allowedImageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const imageExtensionByType: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif'
};
const allowedDocTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);
const allowedDocExtensions = new Set(['.pdf', '.doc', '.docx', '.xls', '.xlsx']);
const docExtensionByType: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx'
};

const uploadEndpoint = process.env.UPLOAD_ENDPOINT;
const uploadToken = process.env.UPLOAD_TOKEN;

type UploadConfig = {
  maxCount: number;
  maxSize: number;
  allowedTypes: Set<string>;
  allowedExtensions: Set<string>;
  extensionByType: Record<string, string>;
  folder: string;
  typeLabel: string;
};

type PreparedFile = {
  file: File;
  extension: string;
  originalName: string;
};

const ensureUploadDir = async (folder: string): Promise<string> => {
  const segments = folder.split('/');
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', ...segments);
  await mkdir(uploadDir, { recursive: true });
  return uploadDir;
};

const prepareFiles = (files: File[], config: UploadConfig): PreparedFile[] => {
  const candidates = files.filter((file) => file.size > 0).slice(0, config.maxCount);

  return candidates.map((file) => {
    const extensionFromType = config.extensionByType[file.type];
    const extensionFromName = path.extname(file.name).toLowerCase();
    const extension = config.allowedExtensions.has(extensionFromName)
      ? extensionFromName
      : extensionFromType || extensionFromName;
    const hasValidExtension = config.allowedExtensions.has(extension);
    const hasValidType = config.allowedTypes.has(file.type);

    if (!hasValidType && !hasValidExtension) {
      throw new Error(`Dozvoljeni su samo ${config.typeLabel} fajlovi.`);
    }

    if (file.size > config.maxSize) {
      throw new Error(`Fajlovi moraju biti manji od ${Math.round(config.maxSize / 1024 / 1024)}MB.`);
    }

    return {
      file,
      extension: hasValidExtension ? extension : extensionFromType || extension,
      originalName: file.name
    };
  });
};

const uploadToEndpoint = async (files: File[], folder: string): Promise<string[]> => {
  if (!uploadEndpoint) {
    return [];
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file, file.name);
  });
  formData.append('folder', folder);

  if (uploadToken) {
    formData.append('token', uploadToken);
  }

  const response = await fetch(uploadEndpoint, {
    method: 'POST',
    body: formData,
    headers: uploadToken ? { 'X-Upload-Token': uploadToken } : undefined
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || 'Neuspesan upload fajlova.';
    throw new Error(message);
  }

  const urls = Array.isArray(payload?.urls)
    ? payload.urls.filter((item: unknown): item is string => typeof item === 'string')
    : [];

  if (!urls.length && files.length) {
    throw new Error('Upload nije vratio URL-ove.');
  }

  return urls;
};

const saveFilesLocally = async (prepared: PreparedFile[], folder: string) => {
  if (!prepared.length) {
    return [];
  }

  const uploadDir = await ensureUploadDir(folder);
  const stored: string[] = [];

  for (const item of prepared) {
    const filename = `${randomUUID()}${item.extension}`;
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await item.file.arrayBuffer());

    await writeFile(filePath, buffer);
    stored.push(`/uploads/${folder}/${filename}`);
  }

  return stored;
};

const saveUploads = async (files: File[], config: UploadConfig): Promise<string[]> => {
  const prepared = prepareFiles(files, config);
  if (!prepared.length) {
    return [];
  }

  if (uploadEndpoint) {
    return uploadToEndpoint(
      prepared.map((item) => item.file),
      config.folder
    );
  }

  return saveFilesLocally(prepared, config.folder);
};

const saveDocuments = async (files: File[]): Promise<ProductDocument[]> => {
  const config: UploadConfig = {
    maxCount: MAX_DOCUMENT_COUNT,
    maxSize: MAX_DOCUMENT_SIZE,
    allowedTypes: allowedDocTypes,
    allowedExtensions: allowedDocExtensions,
    extensionByType: docExtensionByType,
    folder: 'products/docs',
    typeLabel: 'PDF/DOC/DOCX/XLS/XLSX'
  };
  const prepared = prepareFiles(files, config);
  if (!prepared.length) {
    return [];
  }

  const urls = uploadEndpoint
    ? await uploadToEndpoint(
        prepared.map((item) => item.file),
        config.folder
      )
    : await saveFilesLocally(prepared, config.folder);

  return urls.map((url, index) => ({
    name: prepared[index]?.originalName || 'Dokument',
    url
  }));
};

const saveHeroImage = async (files: File[]): Promise<string | null> => {
  const urls = await saveUploads(files, {
    maxCount: MAX_HERO_COUNT,
    maxSize: MAX_IMAGE_SIZE,
    allowedTypes: allowedImageTypes,
    allowedExtensions: allowedImageExtensions,
    extensionByType: imageExtensionByType,
    folder: 'products/images',
    typeLabel: 'JPG/PNG/WEBP/GIF'
  });

  return urls[0] || null;
};

const saveGalleryImages = async (files: File[]): Promise<string[]> =>
  saveUploads(files, {
    maxCount: MAX_GALLERY_COUNT,
    maxSize: MAX_IMAGE_SIZE,
    allowedTypes: allowedImageTypes,
    allowedExtensions: allowedImageExtensions,
    extensionByType: imageExtensionByType,
    folder: 'products/images',
    typeLabel: 'JPG/PNG/WEBP/GIF'
  });

const isAuthorized = (password: string): boolean => {
  if (!process.env.ADMIN_PASSWORD) {
    return true;
  }
  return password === process.env.ADMIN_PASSWORD;
};

const parseBool = (value: FormDataEntryValue | null, fallback = true): boolean => {
  if (value === null) {
    return fallback;
  }
  if (typeof value !== 'string') {
    return fallback;
  }
  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'on', 'yes'].includes(normalized)) {
    return true;
  }
  if (['0', 'false', 'off', 'no'].includes(normalized)) {
    return false;
  }
  return fallback;
};

const parseNumber = (value: FormDataEntryValue | null, fallback = 0): number => {
  if (value === null || typeof value !== 'string') {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export async function GET() {
  try {
    const items = await getProductsList();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Products list error:', error);
    return NextResponse.json(
      { message: 'Ne mogu da ucitam proizvode. Proverite bazu i konekciju.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get('name') || '').trim();
    const slug = String(formData.get('slug') || '').trim();
    const summary = String(formData.get('summary') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const category = String(formData.get('category') || '').trim();
    const seoTitle = String(formData.get('seoTitle') || '').trim();
    const seoDescription = String(formData.get('seoDescription') || '').trim();
    const isActive = parseBool(formData.get('isActive'), true);
    const sortOrder = parseNumber(formData.get('sortOrder'), 0);
    const adminPassword = String(formData.get('adminPassword') || '');

    if (!isAuthorized(adminPassword)) {
      return NextResponse.json({ message: 'Pogresna lozinka.' }, { status: 401 });
    }

    if (!name || !description) {
      return NextResponse.json(
        { message: 'Unesite naziv i opis proizvoda.' },
        { status: 400 }
      );
    }

    const heroFile = formData.get('heroImage');
    const heroFiles = heroFile instanceof File ? [heroFile] : [];
    const galleryFiles = formData
      .getAll('galleryImages')
      .filter((item): item is File => item instanceof File);
    const documentFiles = formData
      .getAll('documents')
      .filter((item): item is File => item instanceof File);

    const [heroImage, gallery, documents] = await Promise.all([
      saveHeroImage(heroFiles),
      saveGalleryImages(galleryFiles),
      saveDocuments(documentFiles)
    ]);

    const result = await createProductEntry({
      name,
      slug,
      summary: summary || null,
      description: description || null,
      category: category || null,
      heroImage,
      gallery,
      documents,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      isActive,
      sortOrder
    });

    return NextResponse.json({
      id: result.id,
      slug: result.slug,
      heroImage,
      gallery,
      documents
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Greska pri cuvanju.';
    console.error('Product create error:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
