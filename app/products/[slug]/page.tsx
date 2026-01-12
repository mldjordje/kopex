import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import type { ProductItem } from '@/lib/products';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const normalizeSlug = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed;
};

const getMetaDescription = (product: ProductItem): string => {
  if (product.seoDescription?.trim()) {
    return product.seoDescription.trim();
  }
  if (product.summary?.trim()) {
    return product.summary.trim();
  }
  const firstBlock = (product.description || '')
    .split(/\n+/)
    .map((block) => block.trim())
    .find(Boolean);
  return firstBlock || `Detalji o proizvodu ${product.name}.`;
};

const renderParagraphs = (value: string) =>
  value
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => <p key={`${index}-${block}`}>{block}</p>);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams.slug);
  if (!slug) {
    return {
      title: 'Proizvod nije pronadjen | KOPEX MIN-LIV',
      description: 'Proizvod nije pronadjen.'
    };
  }

  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: 'Proizvod nije pronadjen | KOPEX MIN-LIV',
      description: 'Proizvod nije pronadjen.'
    };
  }

  return {
    title: product.seoTitle?.trim() || `${product.name} | KOPEX MIN-LIV`,
    description: getMetaDescription(product).slice(0, 180)
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams.slug);
  if (!slug) {
    return (
      <div className="kopex-landing">
        <section className="kopex-section kopex-section--products">
          <div className="stg-container">
            <div className="kopex-product-card__placeholder">Neispravan proizvod.</div>
          </div>
        </section>
      </div>
    );
  }

  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return (
        <div className="kopex-landing">
          <section className="kopex-section kopex-section--products">
            <div className="stg-container">
              <div className="kopex-product-card__placeholder">Proizvod nije pronadjen.</div>
            </div>
          </section>
        </div>
      );
    }

    const hero = product.heroImage || product.gallery[0] || '';
    const gallery = hero
      ? product.gallery.filter((image) => image !== hero)
      : product.gallery;

    return (
      <div className="kopex-landing">
        <section className="kopex-section kopex-section--products">
          <div className="stg-container">
            <div className="kopex-section__header">
              <span className="kopex-eyebrow">Proizvodi</span>
              <h1>{product.name}</h1>
              {product.category ? (
                <p className="kopex-product-detail__category">{product.category}</p>
              ) : null}
            </div>

            <div className="kopex-product-detail">
              <div className="kopex-product-detail__media">
                {hero ? (
                  <img src={hero} alt={product.name} width={1080} height={720} />
                ) : (
                  <div className="kopex-product-card__placeholder">Bez slike</div>
                )}

                {gallery.length ? (
                  <div className="kopex-product-detail__gallery">
                    {gallery.map((image, index) => (
                      <img
                        key={`${product.id}-gallery-${index}`}
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="kopex-product-detail__content">
                {product.summary ? (
                  <p className="kopex-product-detail__lead">{product.summary}</p>
                ) : null}
                {product.description ? (
                  <div className="kopex-product-detail__text">
                    {renderParagraphs(product.description)}
                  </div>
                ) : (
                  <p>Bez opisa.</p>
                )}

                {product.documents.length ? (
                  <div className="kopex-product-detail__docs">
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
            </div>

            <div className="kopex-products-actions">
              <Link href="/products" className="kopex-button kopex-button--ghost">
                Nazad na proizvode
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Product detail error:', error);
    return (
      <div className="kopex-landing">
        <section className="kopex-section kopex-section--products">
          <div className="stg-container">
            <div className="kopex-product-card__placeholder">
              Ne mogu da ucitam proizvod. Pokusajte kasnije.
            </div>
          </div>
        </section>
      </div>
    );
  }
}
