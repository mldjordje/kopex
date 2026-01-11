import { mkdir, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import path from 'path';
import { NextResponse } from 'next/server';
import { createNewsEntry, getNewsList } from '@/lib/news';

export const runtime = 'nodejs';

const MAX_IMAGE_COUNT = 6;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const extensionByType: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif'
};
const uploadEndpoint = process.env.UPLOAD_ENDPOINT;
const uploadToken = process.env.UPLOAD_TOKEN;

const ensureUploadDir = async (): Promise<string> => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news');
  await mkdir(uploadDir, { recursive: true });
  return uploadDir;
};

const prepareFiles = (files: File[]) => {
  const candidates = files.filter((file) => file.size > 0).slice(0, MAX_IMAGE_COUNT);

  return candidates.map((file) => {
    const extensionFromType = extensionByType[file.type];
    const extensionFromName = path.extname(file.name).toLowerCase();
    const extension = allowedExtensions.has(extensionFromName)
      ? extensionFromName
      : extensionFromType || extensionFromName;
    const hasValidExtension = allowedExtensions.has(extension);
    const hasValidType = allowedTypes.has(file.type);

    if (!hasValidType && !hasValidExtension) {
      throw new Error('Dozvoljeni su samo JPG, PNG, WEBP ili GIF formati.');
    }

    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error('Slike moraju biti manje od 5MB.');
    }

    return {
      file,
      extension: hasValidExtension ? extension : extensionFromType || '.jpg'
    };
  });
};

const uploadToEndpoint = async (files: File[], folder?: string): Promise<string[]> => {
  if (!uploadEndpoint) {
    return [];
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file, file.name);
  });
  if (folder) {
    formData.append('folder', folder);
  }

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
    const message = payload?.message || 'Neuspesan upload slika.';
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

const saveImagesLocally = async (prepared: { file: File; extension: string }[]) => {
  if (!prepared.length) {
    return [];
  }

  const uploadDir = await ensureUploadDir();
  const stored: string[] = [];

  for (const item of prepared) {
    const filename = `${randomUUID()}${item.extension}`;
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await item.file.arrayBuffer());

    await writeFile(filePath, buffer);
    stored.push(`/uploads/news/${filename}`);
  }

  return stored;
};

const saveImages = async (files: File[]): Promise<string[]> => {
  const prepared = prepareFiles(files);
  if (!prepared.length) {
    return [];
  }

  if (uploadEndpoint) {
    return uploadToEndpoint(
      prepared.map((item) => item.file),
      'news'
    );
  }

  return saveImagesLocally(prepared);
};

export async function GET() {
  try {
    const items = await getNewsList();
    return NextResponse.json({ items });
  } catch (error) {
    console.error('News list error:', error);
    return NextResponse.json(
      { message: 'Ne mogu da ucitam vesti. Proverite bazu i konekciju.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get('title') || '').trim();
    const body = String(formData.get('body') || '').trim();
    const adminPassword = String(formData.get('adminPassword') || '');

    if (process.env.ADMIN_PASSWORD && adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Pogresna lozinka.' }, { status: 401 });
    }

    if (!title || !body) {
      return NextResponse.json(
        { message: 'Unesite naslov i tekst.' },
        { status: 400 }
      );
    }

    const files = formData.getAll('images').filter((item): item is File => item instanceof File);
    const images = await saveImages(files);
    const id = await createNewsEntry({ title, body, images });

    return NextResponse.json({ id, images });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Greska pri cuvanju.';
    console.error('News create error:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
