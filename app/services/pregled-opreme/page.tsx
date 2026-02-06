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
  lead: 'Tehni?ka opremljenost koja omogu?ava ekonomi?nu i kvalitetnu realizaciju odlivaka.',
  intro: 'Ovim prikazom ?elimo da Vas upoznamo sa na?om opremom, na?inom rada i kapacitetom proizvodnje, kako biste stekli sliku o na?oj firmi i kvalitetu na?ih proizvoda i usluga. Kako ceo proces prati tim dobro obu?enih i iskusnih profesionalaca, do poru?enih proizvoda do?i ?ete na najbr?i i najekonomi?niji na?in.',
  equipmentTitle: 'Tehni?ka opremljenost i kapacitet',
  equipmentItems: [
    'Dve indukcione pe?i kapaciteta 2 tone',
    'Format ma?ine 10, 20, 30, 40',
    'Priprema peska za bentonitnu me?avinu',
    'Postrojenje za regeneraciju peska',
    'Ma?ine za Alphacet postupak',
    'Vibracioni stolovi',
    'Peskirnice (metalnom sa?mom) i dimenzija 2200x1900x2500 cm i kapaciteta 15 tona',
    'Pe?i za termi?ku obradu kapaciteta 10 tona (dimenzije 2100x1400x3500mm) i kapaciteta 6 tona (dimenzija........)',
    'Bazeni za ga?enje i kaljenje dimenzija 4000x3000x4000 cm',
    'Proizvodni kapacitet 100 tona liva mese?no (projektovani kapacitet 1000 tona liva mese?no)',
    'Kaluparnica',
    'Modelarnica (izrada, sanacija i skladi?tenje liva?kih modela)',
    'Kontinuirani mikseri',
    'Stabilne i vise?e brusilice',
    'Aparati za autogeno MMA, TIG i MIG varenje',
    'Kranovi i vede',
    'Vilju?kari i utovariva?',
    'Teretna vozila',
    'Strugovi, glodalice, borverk i CNC ma?ine',
    'Laboratorijska tehnika za mehani?ko i hemijsko ispitivanje (Kvantometar, kidalica, brinel, Sarpijevo klatno), ultrazvuk i magnetni fluks'
  ],
  equipmentImageAlt: 'Tehni?ka opremljenost livnice',
  ctaTitle: 'Spremni smo za Va? upit',
  ctaLead: 'Po?aljite zahteve i specifikacije, na? tim odgovara u najkra?em roku.',
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
