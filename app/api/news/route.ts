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

const ensureUploadDir = async (): Promise<string> => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news');
  await mkdir(uploadDir, { recursive: true });
  return uploadDir;
};

const saveImages = async (files: File[]): Promise<string[]> => {
  const candidates = files.filter((file) => file.size > 0);
  if (!candidates.length) {
    return [];
  }

  const uploadDir = await ensureUploadDir();
  const stored: string[] = [];

  for (const file of candidates.slice(0, MAX_IMAGE_COUNT)) {

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

    const safeExtension = hasValidExtension ? extension : extensionFromType || '.jpg';
    const filename = `${randomUUID()}${safeExtension}`;
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filePath, buffer);
    stored.push(`/uploads/news/${filename}`);
  }

  return stored;
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
