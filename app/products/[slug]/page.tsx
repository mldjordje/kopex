import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getProductBySlug } from '@/lib/products';
import type { ProductItem } from '@/lib/products';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

export const dynamic = 'force-dynamic';

const HERO_SIZES = '(max-width: 739px) 100vw, 50vw';
const GALLERY_SIZES = '(max-width: 739px) 50vw, 16vw';

const PRODUCT_DETAIL_COPY: Record<Language, {
  eyebrow: string;
  noImage: string;
  noDescription: string;
  documentsLabel: string;
  backLabel: string;
  invalidMessage: string;
  notFoundMessage: string;
  loadError: string;
}> = {
  sr: {
    eyebrow: 'Proizvodi',
    noImage: 'Bez slike',
    noDescription: 'Bez opisa.',
    documentsLabel: 'Dokumenta:',
    backLabel: 'Nazad na proizvode',
    invalidMessage: 'Neispravan proizvod.',
    notFoundMessage: 'Proizvod nije pronađen.',
    loadError: 'Ne mogu da učitam proizvod. Pokušajte kasnije.'
  },
  en: {
    eyebrow: 'Products',
    noImage: 'No image',
    noDescription: 'No description.',
    documentsLabel: 'Documents:',
    backLabel: 'Back to products',
    invalidMessage: 'Invalid product.',
    notFoundMessage: 'Product not found.',
    loadError: 'Unable to load product. Please try again later.'
  },
  de: {
    eyebrow: 'Produkte',
    noImage: 'Kein Bild',
    noDescription: 'Keine Beschreibung.',
    documentsLabel: 'Dokumente:',
    backLabel: 'Zurück zu den Produkten',
    invalidMessage: 'Ungültiges Produkt.',
    notFoundMessage: 'Produkt nicht gefunden.',
    loadError: 'Produkt konnte nicht geladen werden. Bitte später erneut versuchen.'
  }
};

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

  try {
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
  } catch (error) {
    console.error('Product metadata error:', error);
    return {
      title: 'Proizvod nije pronadjen | KOPEX MIN-LIV',
      description: 'Proizvod nije pronadjen.'
    };
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = PRODUCT_DETAIL_COPY[language];
  const resolvedParams = await params;
  const slug = normalizeSlug(resolvedParams.slug);
  if (!slug) {
    return (
      <div className="kopex-landing">
        <section className="kopex-section kopex-section--products">
          <div className="stg-container">
            <div className="kopex-product-card__placeholder">{copy.invalidMessage}</div>
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
              <div className="kopex-product-card__placeholder">{copy.notFoundMessage}</div>
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
              <span className="kopex-eyebrow">{copy.eyebrow}</span>
              <h1>{product.name}</h1>
              {product.category ? (
                <p className="kopex-product-detail__category">{product.category}</p>
              ) : null}
            </div>

            <div className="kopex-product-detail">
              <div className="kopex-product-detail__media">
                {hero ? (
                  <Image src={hero} alt={product.name} width={1080} height={720} sizes={HERO_SIZES} />
                ) : (
                  <div className="kopex-product-card__placeholder">{copy.noImage}</div>
                )}

                {gallery.length ? (
                  <div className="kopex-product-detail__gallery">
                    {gallery.map((image, index) => (
                      <Image
                        key={`${product.id}-gallery-${index}`}
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        width={320}
                        height={240}
                        sizes={GALLERY_SIZES}
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
                  <p>{copy.noDescription}</p>
                )}

                {product.documents.length ? (
                  <div className="kopex-product-detail__docs">
                    <span>{copy.documentsLabel}</span>
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
                {copy.backLabel}
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
              {copy.loadError}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
