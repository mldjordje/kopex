import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getProductsList } from '@/lib/products';
import type { ProductItem } from '@/lib/products';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const PRODUCTS_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Proizvodi',
    description: 'Pregled odlivaka, dokumentacije i kategorija proizvoda KOPEX MIN-LIV.',
    keywords: ['proizvodi', 'odlivci', 'dokumentacija', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Products',
    description: 'Overview of castings, documentation, and product categories from KOPEX MIN-LIV.',
    keywords: ['products', 'castings', 'documentation', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Produkte',
    description: 'Ubersicht uber Gussteile, Dokumentation und Produktkategorien von KOPEX MIN-LIV.',
    keywords: ['produkte', 'gussteile', 'dokumentation', 'KOPEX MIN-LIV']
  }
};

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = PRODUCTS_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/products?lang=${language}`
  });
}

export const dynamic = 'force-dynamic';

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1024px) 50vw, 33vw';
const PRODUCTS_COPY: Record<Language, {
  eyebrow: string;
  title: string;
  lead: string;
  errorMessage: string;
  emptyMessage: string;
  noImage: string;
  docsLabel: string;
  viewProduct: string;
  cta: string;
  noDescription: string;
  categoriesLabel: string;
}> = {
  sr: {
    eyebrow: 'Proizvodi',
    title: 'Metalni odlivci za energetiku, rudarstvo i industriju.',
    lead: 'Detaljan pregled proizvodnih mogućnosti, dokumentacije i tipova odliva.',
    errorMessage: 'Ne mogu da učitam proizvode. Proverite bazu i konekciju.',
    emptyMessage: 'Trenutno nema proizvoda.',
    noImage: 'Bez slike',
    docsLabel: 'Dokumenta:',
    viewProduct: 'Pogledaj proizvod',
    cta: 'Pošaljite upit',
    noDescription: 'Bez opisa.',
    categoriesLabel: 'Kategorije'
  },
  en: {
    eyebrow: 'Products',
    title: 'Metal castings for energy, mining, and industry.',
    lead: 'A detailed overview of production capabilities, documentation, and casting types.',
    errorMessage: 'Unable to load products. Please check the database and connection.',
    emptyMessage: 'No products available right now.',
    noImage: 'No image',
    docsLabel: 'Documents:',
    viewProduct: 'View product',
    cta: 'Send inquiry',
    noDescription: 'No description.',
    categoriesLabel: 'Categories'
  },
  de: {
    eyebrow: 'Produkte',
    title: 'Metallguss für Energie, Bergbau und Industrie.',
    lead: 'Detaillierter Überblick über Produktionsmöglichkeiten, Dokumentation und Gussarten.',
    errorMessage: 'Produkte konnten nicht geladen werden. Bitte Datenbank und Verbindung prüfen.',
    emptyMessage: 'Derzeit sind keine Produkte verfügbar.',
    noImage: 'Kein Bild',
    docsLabel: 'Dokumente:',
    viewProduct: 'Produkt ansehen',
    cta: 'Anfrage senden',
    noDescription: 'Keine Beschreibung.',
    categoriesLabel: 'Kategorien'
  }
};

type CategoryKey = 'gray' | 'ductile' | 'steel';

const CATEGORY_ORDER: CategoryKey[] = ['gray', 'ductile', 'steel'];

const CATEGORY_CONTENT: Record<Language, Record<CategoryKey, { title: string; hero: { src: string; alt: string } }>> = {
  sr: {
    gray: {
      title: 'Sivi liv',
      hero: { src: '/img/products/hero-gray.png', alt: 'Sivi liv - hero fotografija' }
    },
    ductile: {
      title: 'Nodularni liv',
      hero: { src: '/img/products/hero-ductile.png', alt: 'Nodularni liv - hero fotografija' }
    },
    steel: {
      title: 'Čelični liv',
      hero: { src: '/img/products/hero-steel.png', alt: 'Čelični liv - hero fotografija' }
    }
  },
  en: {
    gray: {
      title: 'Gray iron',
      hero: { src: '/img/products/hero-gray.png', alt: 'Gray iron hero image' }
    },
    ductile: {
      title: 'Ductile iron',
      hero: { src: '/img/products/hero-ductile.png', alt: 'Ductile iron hero image' }
    },
    steel: {
      title: 'Steel castings',
      hero: { src: '/img/products/hero-steel.png', alt: 'Steel castings hero image' }
    }
  },
  de: {
    gray: {
      title: 'Grauguss',
      hero: { src: '/img/products/hero-gray.png', alt: 'Grauguss Hero-Bild' }
    },
    ductile: {
      title: 'Sphäroguss',
      hero: { src: '/img/products/hero-ductile.png', alt: 'Sphäroguss Hero-Bild' }
    },
    steel: {
      title: 'Stahlguss',
      hero: { src: '/img/products/hero-steel.png', alt: 'Stahlguss Hero-Bild' }
    }
  }
};

type CategoryGalleryItem = { src: string; alt: string; title: string; body: string };

const CATEGORY_GALLERY: Record<Language, Record<CategoryKey, CategoryGalleryItem[]>> = {
  sr: {
    gray: [
      {
        src: '/img/kopex/slides/page-06.jpg',
        alt: 'Sivi liv - reprezentativni odlivak',
        title: 'Sivi liv',
        body: 'Reprezentativni odlivak iz proizvodnje sivog liva.'
      },
      {
        src: '/img/kopex/slides/page-09.jpg',
        alt: 'Sivi liv - odlivak iz proizvodnje',
        title: 'Sivi liv',
        body: 'Primer odlivka sa sivim livom za industrijsku primenu.'
      }
    ],
    ductile: [
      {
        src: '/img/kopex/slides/page-07.jpg',
        alt: 'Nodularni liv - reprezentativni odlivak',
        title: 'Nodularni liv',
        body: 'Reprezentativni odlivak od nodularnog liva.'
      },
      {
        src: '/img/kopex/slides/page-10.jpg',
        alt: 'Nodularni liv - odlivak iz proizvodnje',
        title: 'Nodularni liv',
        body: 'Primer odlivka za zahtevne mehanicke uslove rada.'
      }
    ],
    steel: [
      {
        src: '/img/kopex/slides/page-08.jpg',
        alt: 'Celicni liv - reprezentativni odlivak',
        title: 'Celicni liv',
        body: 'Reprezentativni odlivak od celicnog liva.'
      },
      {
        src: '/img/kopex/slides/page-11.jpg',
        alt: 'Celicni liv - odlivak iz proizvodnje',
        title: 'Celicni liv',
        body: 'Primer odlivka za visoka opterecenja i temperaturu.'
      }
    ]
  },
  en: {
    gray: [
      {
        src: '/img/kopex/slides/page-06.jpg',
        alt: 'Gray iron representative casting',
        title: 'Gray iron',
        body: 'Representative casting from gray iron production.'
      },
      {
        src: '/img/kopex/slides/page-09.jpg',
        alt: 'Gray iron casting from production',
        title: 'Gray iron',
        body: 'Example casting for industrial applications.'
      }
    ],
    ductile: [
      {
        src: '/img/kopex/slides/page-07.jpg',
        alt: 'Ductile iron representative casting',
        title: 'Ductile iron',
        body: 'Representative ductile iron casting.'
      },
      {
        src: '/img/kopex/slides/page-10.jpg',
        alt: 'Ductile iron casting from production',
        title: 'Ductile iron',
        body: 'Example casting for demanding mechanical conditions.'
      }
    ],
    steel: [
      {
        src: '/img/kopex/slides/page-08.jpg',
        alt: 'Steel representative casting',
        title: 'Steel castings',
        body: 'Representative steel casting.'
      },
      {
        src: '/img/kopex/slides/page-11.jpg',
        alt: 'Steel casting from production',
        title: 'Steel castings',
        body: 'Example casting for high loads and temperatures.'
      }
    ]
  },
  de: {
    gray: [
      {
        src: '/img/kopex/slides/page-06.jpg',
        alt: 'Grauguss reprasentatives Gussteil',
        title: 'Grauguss',
        body: 'Reprasentatives Gussteil aus der Graugussproduktion.'
      },
      {
        src: '/img/kopex/slides/page-09.jpg',
        alt: 'Grauguss Gussteil aus der Produktion',
        title: 'Grauguss',
        body: 'Beispielgussteil fur industrielle Anwendungen.'
      }
    ],
    ductile: [
      {
        src: '/img/kopex/slides/page-07.jpg',
        alt: 'Spharoguss reprasentatives Gussteil',
        title: 'Spharoguss',
        body: 'Reprasentatives Gussteil aus Spharoguss.'
      },
      {
        src: '/img/kopex/slides/page-10.jpg',
        alt: 'Spharoguss Gussteil aus der Produktion',
        title: 'Spharoguss',
        body: 'Beispielgussteil fur anspruchsvolle mechanische Anforderungen.'
      }
    ],
    steel: [
      {
        src: '/img/kopex/slides/page-08.jpg',
        alt: 'Stahlguss reprasentatives Gussteil',
        title: 'Stahlguss',
        body: 'Reprasentatives Gussteil aus Stahlguss.'
      },
      {
        src: '/img/kopex/slides/page-11.jpg',
        alt: 'Stahlguss Gussteil aus der Produktion',
        title: 'Stahlguss',
        body: 'Beispielgussteil fur hohe Belastungen und Temperaturen.'
      }
    ]
  }
};

const CATEGORY_MATCHERS: Record<CategoryKey, RegExp[]> = {
  gray: [/sivi/gi, /sivo/gi, /gray/gi, /grau/gi, /grauguss/gi],
  ductile: [/nodular/gi, /nodij/gi, /ductile/gi, /spharo/gi, /sphaero/gi],
  steel: [/celic/gi, /c(el|e)ic/gi, /steel/gi, /stahl/gi, /legir/gi, /alloy/gi, /niskoleg/gi, /mangan/gi]
};

const getSnippet = (value: string, limit: number, fallback: string): string => {
  const block = value
    .split(/\n+/)
    .map((item) => item.trim())
    .find(Boolean);
  const preview = (block || value).replace(/\s+/g, ' ').trim();
  if (!preview) {
    return fallback;
  }
  if (preview.length <= limit) {
    return preview;
  }
  return `${preview.slice(0, limit)}...`;
};

const getProductSnippet = (product: ProductItem, fallback: string): string =>
  getSnippet(product.summary || product.description || '', 180, fallback);

const normalizeCategoryValue = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const resolveCategoryKey = (value: string | null | undefined): CategoryKey => {
  if (!value) {
    return 'steel';
  }
  const normalized = normalizeCategoryValue(value);
  const match = (Object.entries(CATEGORY_MATCHERS) as Array<[CategoryKey, RegExp[]]>)
    .find(([, patterns]) => patterns.some((pattern) => pattern.test(normalized)));
  return match?.[0] ?? 'steel';
};

const resolveCategoryKeyFromProduct = (product: ProductItem): CategoryKey => {
  const candidates = [product.category, product.name, product.summary, product.description]
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  for (const value of candidates) {
    const normalized = normalizeCategoryValue(value);
    const match = (Object.entries(CATEGORY_MATCHERS) as Array<[CategoryKey, RegExp[]]>)
      .find(([, patterns]) => patterns.some((pattern) => pattern.test(normalized)));
    if (match) {
      return match[0];
    }
  }

  return 'steel';
};

export default async function ProductsPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = PRODUCTS_COPY[language];
  const categoryContent = CATEGORY_CONTENT[language];
  const categoryGallery = CATEGORY_GALLERY[language];
  const categories = CATEGORY_ORDER.map((key) => ({
    key,
    id: `category-${key}`,
    title: categoryContent[key].title,
    hero: categoryContent[key].hero,
    items: [] as ProductItem[]
  }));
  const categoryMap = new Map(categories.map((category) => [category.key, category]));
  let items: ProductItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getProductsList();
    items.forEach((product) => {
      const categoryKey = resolveCategoryKeyFromProduct(product);
      categoryMap.get(categoryKey)?.items.push(product);
    });
  } catch (error) {
    console.error('Products page error:', error);
    errorMessage = copy.errorMessage;
  }

  return (
    <div className="kopex-landing">
      <section className="kopex-section kopex-section--products">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>
              {copy.lead}
            </p>
          </div>

          {errorMessage ? (
            <div className="kopex-product-card__placeholder">{errorMessage}</div>
          ) : null}

          {!errorMessage && items.length === 0 ? (
            <div className="kopex-product-card__placeholder">{copy.emptyMessage}</div>
          ) : null}

          <div className="kopex-product-categories">
            <nav className="kopex-category-nav" aria-label={copy.categoriesLabel}>
              <span className="kopex-category-nav__label">{copy.categoriesLabel}</span>
              <div className="kopex-category-nav__list">
                {categories.map((category) => (
                  <a key={category.id} href={`#${category.id}`} className="kopex-category-nav__link">
                    {category.title}
                  </a>
                ))}
              </div>
            </nav>
            {categories.map((category) => (
              <div className="kopex-product-category" id={category.id} key={category.id}>
                <div className="kopex-product-category__hero">
                  <Image
                    src={category.hero.src}
                    alt={category.hero.alt}
                    width={1200}
                    height={720}
                    sizes="(max-width: 739px) 100vw, (max-width: 1200px) 80vw, 900px"
                  />
                </div>
                <h2 className="kopex-product-category__title">{category.title}</h2>
                {category.items.length ? (
                  <div className="kopex-product-grid">
                    {category.items.map((product) => {
                      const cover = product.heroImage || product.gallery[0] || '';
                      return (
                        <article className="kopex-product-card" key={product.id}>
                          {cover ? (
                            <Image src={cover} alt={product.name} width={960} height={720} sizes={CARD_SIZES} />
                          ) : (
                            <div className="kopex-product-card__placeholder">{copy.noImage}</div>
                          )}
                          <div className="kopex-product-card__body">
                            {product.category ? (
                              <span className="kopex-product-card__meta">{product.category}</span>
                            ) : null}
                            <h3>{product.name}</h3>
                            <p>{getProductSnippet(product, copy.noDescription)}</p>
                            {product.documents.length ? (
                              <div className="kopex-product-card__docs">
                                <span>{copy.docsLabel}</span>
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
                                {copy.viewProduct}
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="kopex-product-grid">
                    {categoryGallery[category.key].map((item) => (
                      <article className="kopex-product-card" key={item.src}>
                        <Image src={item.src} alt={item.alt} width={960} height={720} sizes={CARD_SIZES} />
                        <div className="kopex-product-card__body">
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="kopex-products-actions">
            <Link href="/contacts" className="kopex-button kopex-button--primary">
              {copy.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
