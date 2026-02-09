import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const EQUIPMENT_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Pregled opreme',
    description: 'Pregled opreme, kapaciteta i stručnog rada u livnici KOPEX MIN-LIV.',
    keywords: ['pregled opreme', 'kapaciteti', 'livnica', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Equipment overview',
    description: 'Overview of equipment, capacities, and expert work at KOPEX MIN-LIV.',
    keywords: ['equipment overview', 'capacities', 'foundry', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Ausstattungsübersicht',
    description: 'Überblick über Ausstattung, Kapazitäten und Facharbeit bei KOPEX MIN-LIV.',
    keywords: ['ausstattungsübersicht', 'kapazitäten', 'gießerei', 'KOPEX MIN-LIV']
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
  const meta = EQUIPMENT_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/services/pregled-opreme?lang=${language}`
  });
}

const HALF_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 90vw, 50vw';

type EquipmentCopy = {
  title: string;
  lead: string;
  intro: string;
  equipmentTitle: string;
  equipmentItems: string[];
  equipmentImageAlt: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
};

const EQUIPMENT_COPY_SR: EquipmentCopy = {
  title: 'Pregled opreme',
  lead: 'Tehnicka opremljenost koja omogucava ekonomicnu i kvalitetnu realizaciju odlivaka.',
  intro: 'Ovim prikazom zelimo da Vas upoznamo sa nasom opremom, nacinom rada i kapacitetom proizvodnje, kako biste stekli jasnu sliku o nasoj firmi i kvalitetu nasih proizvoda i usluga. Ceo proces vodi tim dobro obucenih i iskusnih profesionalaca, pa do porucenih proizvoda dolazite brzo, pouzdano i ekonomicno.',
  equipmentTitle: 'Tehnicka opremljenost i kapacitet',
  equipmentItems: [
    'Dve indukcione peci kapaciteta 2 tone',
    'Format masine 10, 20, 30, 40',
    'Priprema peska za bentonitnu mesavinu',
    'Postrojenje za regeneraciju peska',
    'Masine za Alphacet postupak',
    'Vibracioni stolovi',
    'Peskirnice (metalnom sacmom), dimenzija 2200x1900x2500 mm, kapaciteta 15 tona',
    'Peci za termicku obradu kapaciteta 10 tona (2100x1400x3500 mm) i 6 tona',
    'Bazeni za gasenje i kaljenje dimenzija 4000x3000x4000 mm',
    'Proizvodni kapacitet 100 tona liva mesecno (projektovani kapacitet 1000 tona liva mesecno)',
    'Kaluparnica',
    'Modelarnica (izrada, sanacija i skladistenje livackih modela)',
    'Kontinuirani mikseri',
    'Stabilne i visece brusilice',
    'Aparati za autogeno MMA, TIG i MIG varenje',
    'Kranovi i vede',
    'Viljuskari i utovarivac',
    'Teretna vozila',
    'Strugovi, glodalice, borverk i CNC masine',
    'Laboratorijska tehnika za mehanicko i hemijsko ispitivanje (kvantometar, kidalica, Brinel, Sarpijevo klatno), ultrazvuk i magnetni fluks'
  ],
  equipmentImageAlt: 'Tehnicka opremljenost livnice',
  ctaTitle: 'Spremni smo za Vas upit',
  ctaLead: 'Posaljite zahteve i specifikacije, nas tim odgovara u najkracem roku.',
  ctaButton: 'Kontaktirajte nas'
};

const EQUIPMENT_COPY: Record<Language, EquipmentCopy> = {
  sr: EQUIPMENT_COPY_SR,
  en: EQUIPMENT_COPY_SR,
  de: EQUIPMENT_COPY_SR
};

export default async function EquipmentOverviewPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = EQUIPMENT_COPY[language];

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
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6 stg-tp-col-12">
            <h2>{copy.equipmentTitle}</h2>
            <p>{copy.intro}</p>
            <ul className="kopex-quality-list">
              {copy.equipmentItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/production-03.jpg"
                alt={copy.equipmentImageAlt}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
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
