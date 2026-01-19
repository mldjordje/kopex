import type { Metadata } from 'next';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';
import NewsPageClient from '@/components/NewsPageClient';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Vesti / Karijera',
  description: 'Najnovije vesti i oglasi za posao iz KOPEX MIN-LIV.'
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  let items: NewsItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getNewsList();
  } catch (error) {
    console.error('News page error:', error);
    errorMessage = 'Ne mogu da ucitam vesti. Pokusajte kasnije.';
  }

  return <NewsPageClient items={items} errorMessage={errorMessage} />;
}
