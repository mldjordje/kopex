import type { Metadata } from 'next';
import AdminGate from '@/components/AdminGate';
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

  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row stg-bottom-gap-l">
          <div className="stg-col-8 stg-offset-2 align-center">
            <h1 className="bringer-page-title">Admin vesti</h1>
            <p className="bringer-large-text">Dodajte nove vesti i proverite poslednje unose.</p>
          </div>
        </div>
      </section>

      <section className="divider-top backlight-top">
        <AdminGate items={items} errorMessage={errorMessage} />
      </section>
    </div>
  );
}
