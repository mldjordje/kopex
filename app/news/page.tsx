import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';
import NewsPageClient from '@/components/NewsPageClient';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const NEWS_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Vesti i karijera',
    description: 'Najnovije vesti, projekti i oglasi za posao iz KOPEX MIN-LIV.',
    keywords: ['vesti', 'karijera', 'oglasi', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | News and careers',
    description: 'Latest news, projects, and job openings from KOPEX MIN-LIV.',
    keywords: ['news', 'careers', 'jobs', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | News und Karriere',
    description: 'Aktuelle Nachrichten, Projekte und Stellenangebote von KOPEX MIN-LIV.',
    keywords: ['news', 'karriere', 'stellenangebote', 'KOPEX MIN-LIV']
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = NEWS_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/news?lang=${language}`
  });
}

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
