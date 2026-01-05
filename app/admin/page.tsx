import type { Metadata } from 'next';
import AdminNewsForm from '@/components/AdminNewsForm';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Admin vesti',
  description: 'Administracija vesti.'
};

export const dynamic = 'force-dynamic';

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('sr-RS', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

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
            <AdminNewsForm requiresPassword={Boolean(process.env.ADMIN_PASSWORD)} />
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h3>Poslednje vesti</h3>
            {errorMessage ? (
              <div className="bringer-block">
                <p>{errorMessage}</p>
              </div>
            ) : null}
            {!errorMessage && items.length === 0 ? (
              <div className="bringer-block">
                <p>Jos uvek nema vesti u bazi.</p>
              </div>
            ) : null}
            {!errorMessage && items.length > 0 ? (
              <div className="bringer-block">
                <ul className="bringer-detailed-list">
                  {items.map((item) => {
                    const preview = item.body.replace(/\s+/g, ' ').trim();
                    const snippet =
                      preview.length > 180 ? `${preview.slice(0, 180)}...` : preview;
                    return (
                      <li key={item.id}>
                        <div className="bringer-detailed-list-title">
                          <h4>
                            {item.title}
                            <span className="bringer-accent">.</span>
                          </h4>
                        </div>
                        <div className="bringer-detailed-list-description">
                          <p>{formatDate(item.createdAt)}</p>
                          <p>{snippet}</p>
                          <p>{item.images.length} slika</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
