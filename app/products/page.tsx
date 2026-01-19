import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsList } from '@/lib/products';
import type { ProductItem } from '@/lib/products';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Proizvodi',
  description: 'Pregled proizvoda i odlivaka iz Kopex MIN-LIV.'
};

export const dynamic = 'force-dynamic';

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1024px) 50vw, 33vw';
const GROUP_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const PRODUCT_GROUPS = [
  {
    title: 'Nodularni liv',
    description: 'Odlivci namenjeni zahtevnim mehanickim opterecenjima i dugom veku trajanja.',
    images: [
      { src: '/img/portfolio/portfolio02.jpg', alt: 'Nodularni liv - proizvod 1' },
      { src: '/img/portfolio/portfolio03.jpg', alt: 'Nodularni liv - proizvod 2' },
      { src: '/img/portfolio/portfolio01.jpg', alt: 'Nodularni liv - proizvod 3' }
    ]
  },
  {
    title: 'Celicni liv',
    description: 'Celicni odlivci za visokotemperaturne i abrazivne uslove rada.',
    images: [
      { src: '/img/portfolio/portfolio04.jpg', alt: 'Celicni liv - proizvod 1' },
      { src: '/img/portfolio/portfolio05.jpg', alt: 'Celicni liv - proizvod 2' },
      { src: '/img/portfolio/portfolio06.jpg', alt: 'Celicni liv - proizvod 3' }
    ]
  },
  {
    title: 'Sivi liv',
    description: 'Serijska proizvodnja odlivaka stabilnih dimenzija i pouzdanog kvaliteta.',
    images: [
      { src: '/img/portfolio/portfolio07.jpg', alt: 'Sivi liv - proizvod 1' },
      { src: '/img/portfolio/portfolio08.jpg', alt: 'Sivi liv - proizvod 2' },
      { src: '/img/portfolio/portfolio09.jpg', alt: 'Sivi liv - proizvod 3' }
    ]
  }
];

const getSnippet = (value: string, limit = 180): string => {
  const block = value
    .split(/\n+/)
    .map((item) => item.trim())
    .find(Boolean);
  const preview = (block || value).replace(/\s+/g, ' ').trim();
  if (!preview) {
    return 'Bez opisa.';
  }
  if (preview.length <= limit) {
    return preview;
  }
  return `${preview.slice(0, limit)}...`;
};

const getProductSnippet = (product: ProductItem): string =>
  getSnippet(product.summary || product.description || '');

export default async function ProductsPage() {
  let items: ProductItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getProductsList();
  } catch (error) {
    console.error('Products page error:', error);
    errorMessage = 'Ne mogu da ucitam proizvode. Proverite bazu i konekciju.';
  }

  return (
    <div className="kopex-landing">
      <section className="kopex-section kopex-section--products">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">Proizvodi</span>
            <h1>Metalni odlivci za energetiku, rudarstvo i industriju.</h1>
            <p>
              Detaljan pregled proizvodnih mogucnosti, dokumentacije i tipova odliva.
            </p>
          </div>

          {errorMessage ? (
            <div className="kopex-product-card__placeholder">{errorMessage}</div>
          ) : null}

          {!errorMessage && items.length === 0 ? (
            <div className="kopex-product-card__placeholder">Trenutno nema proizvoda.</div>
          ) : null}

          {!errorMessage && items.length > 0 ? (
            <div className="kopex-product-grid">
              {items.map((product) => {
                const cover = product.heroImage || product.gallery[0] || '';
                return (
                  <article className="kopex-product-card" key={product.id}>
                    {cover ? (
                      <Image src={cover} alt={product.name} width={960} height={720} sizes={CARD_SIZES} />
                    ) : (
                      <div className="kopex-product-card__placeholder">Bez slike</div>
                    )}
                    <div className="kopex-product-card__body">
                      {product.category ? (
                        <span className="kopex-product-card__meta">{product.category}</span>
                      ) : null}
                      <h3>{product.name}</h3>
                      <p>{getProductSnippet(product)}</p>
                      {product.documents.length ? (
                        <div className="kopex-product-card__docs">
                          <span>Dokumenta:</span>
                          <ul>
                            {product.documents.map((doc) => (
                              <li key={doc.url}>
                                <a href={doc.url} target="_blank" rel="noreferrer">
                                  {doc.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      <div className="kopex-product-card__cta">
                        <Link href={`/products/${product.slug}`} className="kopex-link">
                          Pogledaj proizvod
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

          <div className="stg-top-gap-l">
            <div className="kopex-section__header">
              <span className="kopex-eyebrow">Grupe proizvoda</span>
              <h2>Nodularni, celicni i sivi liv</h2>
              <p>
                Pregled dostupnih fotografija proizvoda grupisanih po vrsti liva.
              </p>
            </div>
            <div className="stg-row">
              {PRODUCT_GROUPS.map((group) => (
                <div className="stg-col-4 stg-tp-col-12 stg-m-bottom-gap" key={group.title}>
                  <div className="bringer-block">
                    <h4>{group.title}</h4>
                    <p>{group.description}</p>
                    <div className="kopex-media-grid">
                      {group.images.map((image, index) => (
                        <div className="kopex-media-grid__item" key={`${group.title}-${index}`}>
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={640}
                            height={480}
                            sizes={GROUP_SIZES}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="kopex-products-actions">
            <Link href="/contacts" className="kopex-button kopex-button--primary">
              Posaljite upit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
