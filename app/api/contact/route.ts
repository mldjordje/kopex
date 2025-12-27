import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    return new NextResponse('Molimo popunite formu.', { status: 400 });
  }

  // TODO: Integrate email delivery or CRM forwarding.
  return new NextResponse('Hvala na poruci! Javi\u0107emo se uskoro.', { status: 200 });
}
