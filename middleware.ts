import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANGUAGE_COOKIE, normalizeLanguage } from '@/lib/language';

export function middleware(request: NextRequest) {
  const languageParam = request.nextUrl.searchParams.get('lang');
  if (!languageParam) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set(LANGUAGE_COOKIE, normalizeLanguage(languageParam), {
    path: '/',
    sameSite: 'lax'
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
