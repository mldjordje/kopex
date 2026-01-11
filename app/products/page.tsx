import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsList } from '@/lib/products';
import type { ProductItem } from '@/lib/products';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Proizvodi',
  description: 'Pregled proizvoda i odlivaka iz Kopex MIN-LIV.'
};

export const dynamic = 'force-dynamic';

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
                      <img src={cover} alt={product.name} width={960} height={720} />
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
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}

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
