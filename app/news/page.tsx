import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';
import NewsPageClient from '@/components/NewsPageClient';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Vesti / Karijera',
  description: 'Najnovije vesti i oglasi za posao iz KOPEX MIN-LIV.'
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const labels: Record<Language, { errorMessage: string }> = {
    sr: { errorMessage: 'Ne mogu da ucitam vesti. Pokusajte kasnije.' },
    en: { errorMessage: 'Unable to load news. Please try again later.' },
    de: { errorMessage: 'Nachrichten konnten nicht geladen werden. Bitte sp\u00e4ter erneut versuchen.' }
  };
  let items: NewsItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getNewsList();
  } catch (error) {
    console.error('News page error:', error);
    errorMessage = labels[language].errorMessage;
  }

  return <NewsPageClient items={items} errorMessage={errorMessage} />;
}
