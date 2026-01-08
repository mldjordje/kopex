import type { Metadata } from 'next';
import AdminPageClient from '@/components/AdminPageClient';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Admin vesti',
  description: 'Administracija vesti.'
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let items: NewsItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getNewsList();
  } catch (error) {
    console.error('Admin news list error:', error);
    errorMessage = 'Ne mogu da ucitam vesti. Proverite bazu i env podesavanja.';
  }

  return <AdminPageClient items={items} errorMessage={errorMessage} />;
}
