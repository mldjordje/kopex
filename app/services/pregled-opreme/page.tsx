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
  lead: 'Tehnička opremljenost koja omogućava ekonomičnu i kvalitetnu realizaciju odliva.',
  intro: 'Ovim prikazom želimo da Vas upoznamo sa našom opremom, kako biste ekonomično i kvalitetnom izradom, brzo došli do realizacije Vaših želja i istovremeno bili efikasni u realizaciji svojih ciljeva. Sve ovo prati stručan rad naših majstora koji imaju veliko iskustvo i tradiciju, što krasi našu ponudu.',
  equipmentTitle: 'Tehnička opremljenost kapacitetom',
  equipmentItems: [
    'Indukcione peći kapaciteta od po 2 tone, proizvođač BBC, kapaciteta 15 t/dan',
    'Kaluparnica',
    'Modelarnica',
    'Format mašine 10, 20, 30, 40, ručno kalupovanje u bentonitnoj mešavini, furanskim smolama',
    'Mikseri za sigelnu mešavinu',
    'Konti mešač',
    'Mašine za ŠALKO postupak, CO2, furanska smola',
    'Peskirnice VK-5 i G-2, VK 3, kapaciteta 15 t',
    'Peć za termičku obradu kapaciteta 15 tona',
    'Stabilne brusilice',
    'Viseće brusilice',
    'Kranovi',
    'Vede',
    'Viljuškare',
    'Arker aparati i autogeno sečenje',
    'Laboratorija za kontrolu kvaliteta sa kvantometrom, mikroskopom, brinelom, kidalicom'
  ],
  equipmentImageAlt: 'Tehnička opremljenost livnice',
  ctaTitle: 'Spremni smo za Vaš upit',
  ctaLead: 'Pošaljite zahteve i specifikacije, naš tim odgovara u najkraćem roku.',
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
