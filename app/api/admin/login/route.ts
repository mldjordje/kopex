import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const password = String(formData.get('password') || '');

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ ok: true });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Pogresna lozinka.' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ message: 'Greska pri prijavi.' }, { status: 500 });
  }
}
