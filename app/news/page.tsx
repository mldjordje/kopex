import type { Metadata } from 'next';
import { getNewsList } from '@/lib/news';
import type { NewsItem } from '@/lib/news';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Vesti',
  description: 'Najnovije vesti iz KOPEX MIN-LIV.'
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

const renderParagraphs = (body: string) => {
  return body
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => <p key={`${block}-${index}`}>{block}</p>);
};

export default async function NewsPage() {
  let items: NewsItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getNewsList();
  } catch (error) {
    console.error('News page error:', error);
    errorMessage = 'Ne mogu da ucitam vesti. Pokusajte kasnije.';
  }

  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row stg-bottom-gap-l">
          <div className="stg-col-8 stg-offset-2 align-center">
            <h1 className="bringer-page-title">Vesti</h1>
            <p className="bringer-large-text">Najnovije informacije i objave iz Kopex MIN-LIV.</p>
          </div>
        </div>
      </section>

      <section className="divider-top backlight-top">
        {errorMessage ? (
          <div className="stg-row">
            <div className="stg-col-8 stg-offset-2">
              <div className="bringer-block">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        ) : null}

        {!errorMessage && items.length === 0 ? (
          <div className="stg-row">
            <div className="stg-col-8 stg-offset-2">
              <div className="bringer-block">
                <p>Trenutno nema objavljenih vesti.</p>
              </div>
            </div>
          </div>
        ) : null}

        {!errorMessage && items.length > 0 ? (
          <div className="stg-row">
            {items.map((item) => {
              const [cover, ...gallery] = item.images;
              return (
                <article
                  key={item.id}
                  className="stg-col-6 stg-tp-col-12 stg-bottom-gap-l"
                >
                  <div className="bringer-block">
                    {cover ? (
                      <div className="bringer-parallax-media">
                        <img
                          className="bringer-lazy"
                          src={cover}
                          data-src={cover}
                          alt={item.title}
                          width={960}
                          height={640}
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="stg-top-gap">
                      <h3>{item.title}</h3>
                      <p className="bringer-large-text">{formatDate(item.createdAt)}</p>
                      {renderParagraphs(item.body)}
                    </div>
                    {gallery.length > 0 ? (
                      <div className="bringer-grid-2cols stg-top-gap">
                        {gallery.map((image, index) => (
                          <div key={`${item.id}-image-${index}`} className="bringer-parallax-media">
                            <img
                              className="bringer-lazy"
                              src={image}
                              data-src={image}
                              alt={`${item.title} ${index + 2}`}
                              width={960}
                              height={640}
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
