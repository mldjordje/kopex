import type { Metadata } from 'next';
import AdminNewsForm from '@/components/AdminNewsForm';
import AdminNewsList from '@/components/AdminNewsList';
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
        <div className="stg-row stg-large-gap">
          <div className="stg-col-6 stg-tp-col-12 stg-tp-bottom-gap">
            <h3>Nova vest</h3>
            <AdminNewsForm />
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h3>Poslednje vesti</h3>
            {errorMessage ? (
              <div className="bringer-block">
                <p>{errorMessage}</p>
              </div>
            ) : null}
            {!errorMessage ? <AdminNewsList items={items} /> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
