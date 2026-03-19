import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const PROGRAM_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Proizvodni program',
    description: 'Primarni i sekundarni proizvodni program livnice KOPEX MIN-LIV.',
    keywords: ['proizvodni program', 'odlivci', 'laboratorija', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Production program',
    description: 'Primary and secondary production program of KOPEX MIN-LIV.',
    keywords: ['production program', 'castings', 'laboratory', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Produktionsprogramm',
    description: 'Primäres und sekundäres Produktionsprogramm von KOPEX MIN-LIV.',
    keywords: ['produktionsprogramm', 'gussteile', 'labor', 'KOPEX MIN-LIV']
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
  const meta = PROGRAM_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/services/proizvodni-program?lang=${language}`
  });
}

type ProgramCopy = {
  title: string;
  lead: string;
  primaryTitle: string;
  primaryItems: string[];
  secondaryTitle: string;
  labTitle: string;
  labItems: string[];
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
};

const PROGRAM_COPY_SR: ProgramCopy = {
  title: 'Proizvodni program',
  lead: 'Proizvodni program KOPEX MIN-LIV D.O.O. obuhvata primarni i sekundarni program usluga.',
  primaryTitle: 'Primarni proizvodni program',
  primaryItems: [
    'Odlivci od sivog liva',
    'Odlivci od nodularnog liva',
    'Odlivci od nisko legiranih livenih gvožđa',
    'Odlivci od visoko legiranih livenih gvožđa',
    'Odlivci od ugljeničnog čeličnog liva',
    'Odlivci od visoko legiranih čelika',
    'Odlivci od visoko legiranih Mn-čelika'
  ],
  secondaryTitle: 'Sekundarni proizvodni program',
  labTitle: 'Usluge metalurške laboratorije (kontrola kvaliteta)',
  labItems: [
    'Mehanička ispitivanja',
    'Ispitivanje hemijskog sastava (kvantometar)',
    'Metalografska kontrola',
    'IBR (ultra-zvuk, penetranti, magnetni fluks)',
    'Izdavanje uverenja o kvalitetu ispitivanog materijala'
  ],
  ctaTitle: 'Pošaljite upit',
  ctaLead: 'Naš tim stoji na raspolaganju za dodatne informacije o programu i rokovima.',
  ctaButton: 'Kontaktirajte nas'
};

const PROGRAM_COPY: Record<Language, ProgramCopy> = {
  sr: PROGRAM_COPY_SR,
  en: PROGRAM_COPY_SR,
  de: PROGRAM_COPY_SR
};

export default async function ProductionProgramPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = PROGRAM_COPY[language];

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
        <div className="stg-row stg-large-gap">
          <div className="stg-col-6 stg-tp-col-12">
            <h2>{copy.primaryTitle}</h2>
            <ol>
              {copy.primaryItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h2>{copy.secondaryTitle}</h2>
            <h4>{copy.labTitle}</h4>
            <ul className="kopex-quality-list">
              {copy.labItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
</div>
        </div>
      </section>

      <section>
        <div className="align-center stg-bottom-gap-l">
          <h2>{copy.ctaTitle}</h2>
          <p className="bringer-large-text">{copy.ctaLead}</p>
        </div>
        <div className="align-center">
          <Link href="/contacts" className="bringer-button">{copy.ctaButton}</Link>
        </div>
      </section>
    </div>
  );
}
