import type { Metadata } from 'next';
import Image from 'next/image';
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

const GALLERY_IMAGES = [
  '/galerija/1.jpg',
  '/galerija/-2.jpg',
  '/galerija/-3.jpg',
  '/galerija/-4.jpg',
  '/galerija/-11.jpeg',
  '/galerija/-12.jpeg',
  '/galerija/-13.jpeg',
  '/galerija/-14.jpeg',
  '/galerija/-15.jpeg',
  '/galerija/-16.jpeg',
  '/galerija/-17.jpeg',
  '/galerija/-18.jpeg',
  '/galerija/-19.jpeg',
  '/galerija/-20.jpeg',
  '/galerija/-21.jpeg',
  '/galerija/-22.jpeg',
  '/galerija/-23.jpeg',
  '/galerija/-24.jpeg',
  '/galerija/-25.jpeg',
  '/galerija/-26.jpeg',
  '/galerija/-27.jpeg',
  '/galerija/-28.jpeg',
  '/galerija/-29.jpeg',
  '/galerija/-30.jpeg',
  '/galerija/-32.jpeg',
  '/galerija/-34.jpeg',
  '/galerija/-35.jpeg',
  '/galerija/-36.jpeg',
  '/galerija/-37.jpeg',
  '/galerija/-39.jpeg'
];

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const resolveGridClass = (index: number): string => {
  const base = 'kopex-media-grid__item';
  const mod = index % 10;
  if (mod === 0) {
    return `${base} ${base}--large`;
  }
  if (mod === 3) {
    return `${base} ${base}--tall`;
  }
  if (mod === 6) {
    return `${base} ${base}--wide`;
  }
  return base;
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
        <div className="kopex-media-grid">
          {GALLERY_IMAGES.map((src, index) => (
            <div className={resolveGridClass(index)} key={src}>
              <Image src={src} alt={`Galerija ${index + 1}`} width={960} height={720} sizes={CARD_SIZES} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
