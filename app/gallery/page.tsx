import type { Metadata } from 'next';
import Image from 'next/image';
import path from 'path';
import { readdir } from 'fs/promises';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const GALLERY_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Galerija',
    description: 'Galerija fotografija iz proizvodnje i pogona KOPEX MIN-LIV.',
    keywords: ['galerija', 'fotografije', 'proizvodnja', 'KOPEX MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Gallery',
    description: 'Photo gallery from production and facilities of KOPEX MIN-LIV.',
    keywords: ['gallery', 'photos', 'production', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Galerie',
    description: 'Fotogalerie aus Produktion und Anlagen von KOPEX MIN-LIV.',
    keywords: ['galerie', 'fotos', 'produktion', 'KOPEX MIN-LIV']
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
  const meta = GALLERY_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/gallery?lang=${language}`
  });
}

export const dynamic = 'force-dynamic';

const GALLERY_COPY: Record<Language, { title: string; lead: string }> = {
  sr: {
    title: 'Galerija',
    lead: 'Fotografije iz proizvodnje, radionica i pogona KOPEX MIN-LIV.'
  },
  en: {
    title: 'Gallery',
    lead: 'Photos from production, workshops, and facilities of KOPEX MIN-LIV.'
  },
  de: {
    title: 'Galerie',
    lead: 'Fotos aus Produktion, Werkstätten und Anlagen von KOPEX MIN-LIV.'
  }
};

const GALLERY_SECTIONS: Record<Language, { factory: string; production: string; products: string }> = {
  sr: {
    factory: 'Slike fabrike i dvorišta',
    production: 'Slike proizvodnje',
    products: 'Slike proizvoda'
  },
  en: {
    factory: 'Factory and yard',
    production: 'Production',
    products: 'Products'
  },
  de: {
    factory: 'Fabrik und Hof',
    production: 'Produktion',
    products: 'Produkte'
  }
};

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const getGalleryFiles = async (): Promise<string[]> => {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'galerija');
    const files = await readdir(galleryDir);
    return files
      .filter((file) => /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  } catch (error) {
    console.error('Gallery images error:', error);
    return [];
  }
};

export default async function GalleryPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = GALLERY_COPY[language];
  const sectionLabels = GALLERY_SECTIONS[language];
  const galleryFiles = await getGalleryFiles();
  const excludedFiles = new Set([
    '-53.jpeg',
    '-54.jpg',
    '-55.jpg',
    '34v (1).jpg',
    '45v (1).jpeg',
    '48v (1).jpeg'
  ]);

  const factoryOrder = [
    '-11.jpeg',
    '-12.jpeg',
    '-13.jpeg',
    '-14.jpeg',
    '-15.jpeg',
    '-16.jpeg',
    '-17.jpeg',
    '-18.jpeg',
    '-19.jpeg',
    '-21.jpeg',
    '-22.jpeg',
    '-23.jpeg',
    '-24.jpeg',
    '-25.jpeg',
    '-26.jpeg',
    '-27.jpeg',
    '-65.jpeg',
    '-66.jpeg',
    '-67.jpeg',
    '-68.jpeg',
    '-69.jpeg',
    '21.jpg'
  ];

  const productionOrder = [
    '-2.jpg',
    '-3.jpg',
    '-4.jpg',
    '-20.jpeg',
    '-28.jpeg',
    '-29.jpeg',
    '-30.jpeg',
    '-32.jpeg',
    '-34.jpeg',
    '-35.jpeg',
    '-36.jpeg',
    '-37.jpeg',
    '-39.jpeg',
    '-40.jpeg',
    '-41.jpeg',
    '-42.jpeg',
    '-43.jpeg',
    '-44.jpeg',
    '-45.jpeg',
    '-46.jpeg',
    '-47.jpeg',
    '-56.jpeg',
    '-59.jpeg',
    '-61.jpeg',
    '-62.jpeg',
    '-63.jpeg',
    '-64.jpeg'
  ];

  const productsOrder = [
    '1.jpg',
    '30v.jpg',
    '31v.jpg',
    '32v.jpg',
    '33v.jpg',
    '34v.jpg',
    '36v.jpg',
    '37v.jpg',
    '38v.jpg',
    '39v.jpg',
    '40v.jpeg',
    '41v.jpeg',
    '42v.jpeg',
    '43v.jpeg',
    '44v.jpeg',
    '45v.jpeg',
    '46v.jpeg',
    '48v.jpeg',
    '50v.jpeg',
    '-50.jpeg',
    '-51.jpeg'
  ];

  const availableFiles = new Set(galleryFiles.filter((file) => !excludedFiles.has(file)));
  const pickOrderedFiles = (files: string[]) => files.filter((file) => availableFiles.has(file));

  const factoryImages = pickOrderedFiles(factoryOrder);
  const productImages = pickOrderedFiles(productsOrder);
  const productionBase = pickOrderedFiles(productionOrder);
  const assigned = new Set([...factoryImages, ...productImages, ...productionBase]);
  const productionImages = [
    ...productionBase,
    ...Array.from(availableFiles).filter((file) => !assigned.has(file))
  ];

  const toSrc = (file: string) => `/galerija/${file}`;

  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row">
          <div className="stg-col-8 stg-offset-2 align-center stg-tp-col-10 stg-tp-offset-1">
            <h1 className="bringer-page-title">{copy.title}</h1>
            <p className="bringer-large-text">{copy.lead}</p>
          </div>
        </div>
      </section>

      <section className="divider-bottom">
        <h2>{sectionLabels.factory}</h2>
        <div className="kopex-gallery-grid">
          {factoryImages.map((file, index) => (
            <div className="kopex-gallery-item" key={`factory-${file}`}>
              <Image
                src={toSrc(file)}
                alt={`${sectionLabels.factory} ${index + 1}`}
                width={1200}
                height={900}
                sizes={CARD_SIZES}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>

        <h2>{sectionLabels.production}</h2>
        <div className="kopex-gallery-grid">
          {productionImages.map((file, index) => (
            <div className="kopex-gallery-item" key={`production-${file}`}>
              <Image
                src={toSrc(file)}
                alt={`${sectionLabels.production} ${index + 1}`}
                width={1200}
                height={900}
                sizes={CARD_SIZES}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>

        <h2>{sectionLabels.products}</h2>
        <div className="kopex-gallery-grid">
          {productImages.map((file, index) => (
            <div className="kopex-gallery-item" key={`products-${file}`}>
              <Image
                src={toSrc(file)}
                alt={`${sectionLabels.products} ${index + 1}`}
                width={1200}
                height={900}
                sizes={CARD_SIZES}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
