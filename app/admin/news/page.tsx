import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminNewsPageClient from '@/components/AdminNewsPageClient';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const ADMIN_NEWS_META: Record<Language, { title: string; description: string }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Admin vesti',
    description: 'Administracija vesti KOPEX MIN-LIV.'
  },
  en: {
    title: 'KOPEX MIN-LIV | Admin news',
    description: 'KOPEX MIN-LIV news administration.'
  },
  de: {
    title: 'KOPEX MIN-LIV | Admin Nachrichten',
    description: 'Administration der KOPEX MIN-LIV Nachrichten.'
  }
};

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = ADMIN_NEWS_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    path: `/admin/news?lang=${language}`
  });
}

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  let items: NewsItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getNewsList();
  } catch (error) {
    console.error('Admin news list error:', error);
    errorMessage = 'Ne mogu da ucitam vesti. Proverite bazu i env podesavanja.';
  }

  return <AdminNewsPageClient items={items} errorMessage={errorMessage} />;
}
