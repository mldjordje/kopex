import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { deleteNewsEntry, updateNewsEntry } from '@/lib/news';

export const runtime = 'nodejs';

const normalizeId = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed;
};

const isAuthorized = (password: string): boolean => {
  if (!process.env.ADMIN_PASSWORD) {
    return true;
  }
  return password === process.env.ADMIN_PASSWORD;
};

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  const id = normalizeId(resolvedParams.id);
  if (!id) {
    return NextResponse.json({ message: 'Neispravan ID.' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const title = String(formData.get('title') || '').trim();
    const body = String(formData.get('body') || '').trim();
    const adminPassword = String(formData.get('adminPassword') || '');

    if (!isAuthorized(adminPassword)) {
      return NextResponse.json({ message: 'Pogresna lozinka.' }, { status: 401 });
    }

    if (!title || !body) {
      return NextResponse.json({ message: 'Unesite naslov i tekst.' }, { status: 400 });
    }

    await updateNewsEntry({ id, title, body });
    return NextResponse.json({ id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Greska pri izmeni.';
    console.error('News update error:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  const id = normalizeId(resolvedParams.id);
  if (!id) {
    return NextResponse.json({ message: 'Neispravan ID.' }, { status: 400 });
  }

  let adminPassword = '';
  try {
    const formData = await request.formData();
    adminPassword = String(formData.get('adminPassword') || '');
  } catch {
    adminPassword = '';
  }

  if (!isAuthorized(adminPassword)) {
    return NextResponse.json({ message: 'Pogresna lozinka.' }, { status: 401 });
  }

  try {
    await deleteNewsEntry(id);
    return NextResponse.json({ id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Greska pri brisanju.';
    console.error('News delete error:', error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
