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

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const getGalleryImages = async (): Promise<string[]> => {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'galerija');
    const files = await readdir(galleryDir);
    return files
      .filter((file) => /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((file) => `/galerija/${file}`);
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
  const galleryImages = await getGalleryImages();

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
        <div className="kopex-gallery-grid">
          {galleryImages.map((src, index) => (
            <div className="kopex-gallery-item" key={src}>
              <Image
                src={src}
                alt={`Galerija ${index + 1}`}
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
