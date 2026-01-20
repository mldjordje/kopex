import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getProductsList } from '@/lib/products';
import type { ProductItem } from '@/lib/products';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';
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

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
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
const GROUP_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const PRODUCTS_COPY: Record<Language, {
  eyebrow: string;
  title: string;
  lead: string;
  errorMessage: string;
  emptyMessage: string;
  noImage: string;
  docsLabel: string;
  viewProduct: string;
  groupsEyebrow: string;
  groupsTitle: string;
  groupsLead: string;
  cta: string;
  noDescription: string;
  categoriesLabel: string;
  uncategorized: string;
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
    groupsEyebrow: 'Grupe proizvoda',
    groupsTitle: 'Nodularni, čelični i sivi liv',
    groupsLead: 'Pregled dostupnih fotografija proizvoda grupisanih po vrsti liva.',
    cta: 'Pošaljite upit',
    noDescription: 'Bez opisa.',
    categoriesLabel: 'Kategorije',
    uncategorized: 'Ostalo'
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
    groupsEyebrow: 'Product groups',
    groupsTitle: 'Ductile, steel, and gray iron',
    groupsLead: 'Overview of available product photos grouped by casting type.',
    cta: 'Send inquiry',
    noDescription: 'No description.',
    categoriesLabel: 'Categories',
    uncategorized: 'Other'
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
    groupsEyebrow: 'Produktgruppen',
    groupsTitle: 'Sphäro-, Stahl- und Grauguss',
    groupsLead: 'Übersicht verfügbarer Produktfotos nach Gussart gruppiert.',
    cta: 'Anfrage senden',
    noDescription: 'Keine Beschreibung.',
    categoriesLabel: 'Kategorien',
    uncategorized: 'Weitere'
  }
};

const PRODUCT_GROUPS: Record<Language, Array<{
  title: string;
  description: string;
  images: Array<{ src: string; alt: string }>;
}>> = {
  sr: [
    {
      title: 'Nodularni liv',
      description: 'Odlivci namenjeni zahtevnim mehaničkim opterećenjima i dugom veku trajanja.',
      images: [
        { src: '/img/portfolio/portfolio02.jpg', alt: 'Nodularni liv - proizvod 1' },
        { src: '/img/portfolio/portfolio03.jpg', alt: 'Nodularni liv - proizvod 2' },
        { src: '/img/portfolio/portfolio01.jpg', alt: 'Nodularni liv - proizvod 3' }
      ]
    },
    {
      title: 'Čelični liv',
      description: 'Čelični odlivci za visokotemperaturne i abrazivne uslove rada.',
      images: [
        { src: '/img/portfolio/portfolio04.jpg', alt: 'Čelični liv - proizvod 1' },
        { src: '/img/portfolio/portfolio05.jpg', alt: 'Čelični liv - proizvod 2' },
        { src: '/img/portfolio/portfolio06.jpg', alt: 'Čelični liv - proizvod 3' }
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
  ],
  en: [
    {
      title: 'Ductile iron',
      description: 'Castings designed for demanding mechanical loads and long service life.',
      images: [
        { src: '/img/portfolio/portfolio02.jpg', alt: 'Ductile iron - product 1' },
        { src: '/img/portfolio/portfolio03.jpg', alt: 'Ductile iron - product 2' },
        { src: '/img/portfolio/portfolio01.jpg', alt: 'Ductile iron - product 3' }
      ]
    },
    {
      title: 'Steel castings',
      description: 'Steel castings for high-temperature and abrasive operating conditions.',
      images: [
        { src: '/img/portfolio/portfolio04.jpg', alt: 'Steel casting - product 1' },
        { src: '/img/portfolio/portfolio05.jpg', alt: 'Steel casting - product 2' },
        { src: '/img/portfolio/portfolio06.jpg', alt: 'Steel casting - product 3' }
      ]
    },
    {
      title: 'Gray iron',
      description: 'Series production of castings with stable dimensions and reliable quality.',
      images: [
        { src: '/img/portfolio/portfolio07.jpg', alt: 'Gray iron - product 1' },
        { src: '/img/portfolio/portfolio08.jpg', alt: 'Gray iron - product 2' },
        { src: '/img/portfolio/portfolio09.jpg', alt: 'Gray iron - product 3' }
      ]
    }
  ],
  de: [
    {
      title: 'Sphäroguss',
      description: 'Gussteile für hohe mechanische Belastungen und lange Lebensdauer.',
      images: [
        { src: '/img/portfolio/portfolio02.jpg', alt: 'Sphäroguss - Produkt 1' },
        { src: '/img/portfolio/portfolio03.jpg', alt: 'Sphäroguss - Produkt 2' },
        { src: '/img/portfolio/portfolio01.jpg', alt: 'Sphäroguss - Produkt 3' }
      ]
    },
    {
      title: 'Stahlguss',
      description: 'Stahlgussteile für Hochtemperatur- und abrasive Einsatzbedingungen.',
      images: [
        { src: '/img/portfolio/portfolio04.jpg', alt: 'Stahlguss - Produkt 1' },
        { src: '/img/portfolio/portfolio05.jpg', alt: 'Stahlguss - Produkt 2' },
        { src: '/img/portfolio/portfolio06.jpg', alt: 'Stahlguss - Produkt 3' }
      ]
    },
    {
      title: 'Grauguss',
      description: 'Serienfertigung von Gussteilen mit stabilen Abmessungen und zuverlässiger Qualität.',
      images: [
        { src: '/img/portfolio/portfolio07.jpg', alt: 'Grauguss - Produkt 1' },
        { src: '/img/portfolio/portfolio08.jpg', alt: 'Grauguss - Produkt 2' },
        { src: '/img/portfolio/portfolio09.jpg', alt: 'Grauguss - Produkt 3' }
      ]
    }
  ]
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

const createCategoryId = (value: string): string => {
  const slug = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `category-${slug || 'general'}`;
};

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = PRODUCTS_COPY[language];
  const groups = PRODUCT_GROUPS[language];
  let items: ProductItem[] = [];
  let errorMessage: string | null = null;
  let categories: Array<{ id: string; title: string; items: ProductItem[] }> = [];

  try {
    items = await getProductsList();
    const categoryMap = new Map<string, { id: string; title: string; items: ProductItem[] }>();
    items.forEach((product) => {
      const categoryName = (product.category || copy.uncategorized).trim() || copy.uncategorized;
      const existing = categoryMap.get(categoryName);
      if (existing) {
        existing.items.push(product);
      } else {
        categoryMap.set(categoryName, {
          id: createCategoryId(categoryName),
          title: categoryName,
          items: [product]
        });
      }
    });
    categories = Array.from(categoryMap.values());
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

          {!errorMessage && items.length > 0 ? (
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
                  <h2 className="kopex-product-category__title">{category.title}</h2>
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
                </div>
              ))}
            </div>
          ) : null}

          <div className="stg-top-gap-l">
            <div className="kopex-section__header">
              <span className="kopex-eyebrow">{copy.groupsEyebrow}</span>
              <h2>{copy.groupsTitle}</h2>
              <p>
                {copy.groupsLead}
              </p>
            </div>
            <div className="stg-row">
              {groups.map((group) => (
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
              {copy.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
