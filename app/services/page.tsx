import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const SERVICES_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Opremljenost i kapaciteti',
    description: 'Tehnicka opremljenost, laboratorija i kapaciteti livnice KOPEX MIN-LIV u Nisu.',
    keywords: ['opremljenost', 'kapaciteti', 'livnica', 'laboratorija', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Equipment and capacities',
    description: 'Technical equipment, laboratory, and production capacities of the KOPEX MIN-LIV foundry in Nis.',
    keywords: ['equipment', 'capacities', 'foundry', 'laboratory', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Ausstattung und Kapazitat',
    description: 'Technische Ausstattung, Labor und Produktionskapazitaten der KOPEX MIN-LIV Giesserei in Nis.',
    keywords: ['ausstattung', 'kapazitat', 'giesserei', 'labor', 'KOPEX MIN-LIV']
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = SERVICES_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/services?lang=${language}`
  });
}

const PARALLAX_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 90vw, 50vw';

const SERVICES_COPY: Record<Language, {
  title: string;
  lead: string;
  equipmentItems: Array<{ title: string; body: string }>;
  equipmentImageAlt: string;
  capacitiesTitle: string;
  capacitiesLead: string;
  capacitiesCards: Array<{ title: string; body: string }>;
  labTitle: string;
  labLead: string;
  labBody: string;
  labImageAlt: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
}> = {
  sr: {
    title: 'Tehnička opremljenost',
    lead: 'Kompletna tehnologija livenja, termičke obrade i mašinske obrade.',
    equipmentItems: [
      {
        title: 'Indukcione peći',
        body: 'Kapacitet 2,5 t, sa mogućnošću liva do 3 t (nodularni i čelični) i 6 t (sivi liv).'
      },
      {
        title: 'Priprema peska',
        body: 'Alfaset postupak i regeneracija peska.'
      },
      {
        title: 'Mikseri i postupci',
        body: 'Mikseri za sigelnu mešavinu, ŠALKO postupak, CO2 i furanske smole.'
      },
      {
        title: 'Peskirnice',
        body: 'Peskirnice metalnom sačmom dimenzija 2200x1900x2500.'
      },
      {
        title: 'Termička obrada',
        body: 'Peći 10 t (2100x1400x3500) i bazeni za gašenje/kaljenje 4000x3000x4000.'
      },
      {
        title: 'Mašinska obrada',
        body: 'Glodalica, strug i CNC mašine za preciznu obradu odlivaka.'
      }
    ],
    equipmentImageAlt: 'Opremljenost',
    capacitiesTitle: 'Kapaciteti',
    capacitiesLead: 'Stabilna proizvodnja i fleksibilnost za velike industrijske odlivke.',
    capacitiesCards: [
      {
        title: '100 t/mesec',
        body: 'Trenutni kapacitet proizvodnje (projektovano 1000 t/mesec).'
      },
      {
        title: '2,5 t',
        body: 'Kapacitet indukcionih peći za stabilan proces livenja.'
      },
      {
        title: '3-6 t',
        body: 'Maksimalna težina odlivaka: 3 t (nodularni/čelični), 6 t (sivi liv).'
      }
    ],
    labTitle: 'Laboratorija',
    labLead: 'Sertifikovana laboratorija za mehanička i hemijska ispitivanja i kontrolu kvaliteta.',
    labBody: 'Kvantometar, mikroskop, brinel, Sarpijevo klatno, kidalica, ultrazvuk i magnetni fluks.',
    labImageAlt: 'Laboratorija',
    ctaTitle: 'Očekujemo vaš upit!',
    ctaLead: 'Pošaljite zahteve i specifikacije, naš tim je spreman da odgovori u najkraćem roku.',
    ctaButton: 'Kontaktirajte nas'
  },
  en: {
    title: 'Technical equipment',
    lead: 'Complete casting, heat treatment, and machining technology.',
    equipmentItems: [
      {
        title: 'Induction furnaces',
        body: 'Capacity 2.5 t, with melt casting up to 3 t (ductile and steel) and 6 t (gray iron).'
      },
      {
        title: 'Sand preparation',
        body: 'Alfaset process and sand reclamation.'
      },
      {
        title: 'Mixers and processes',
        body: 'Mixers for silicate mix, ŠALKO process, CO2 and furan resins.'
      },
      {
        title: 'Shot blasting rooms',
        body: 'Shot blasting rooms with steel shot dimensions 2200x1900x2500.'
      },
      {
        title: 'Heat treatment',
        body: 'Furnaces 10 t (2100x1400x3500) and quench tanks 4000x3000x4000.'
      },
      {
        title: 'Machining',
        body: 'Milling, lathe, and CNC machines for precise casting machining.'
      }
    ],
    equipmentImageAlt: 'Equipment',
    capacitiesTitle: 'Capacities',
    capacitiesLead: 'Stable production and flexibility for large industrial castings.',
    capacitiesCards: [
      {
        title: '100 t/month',
        body: 'Current production capacity (planned 1000 t/month).'
      },
      {
        title: '2.5 t',
        body: 'Induction furnace capacity for a stable casting process.'
      },
      {
        title: '3-6 t',
        body: 'Maximum casting weight: 3 t (ductile/steel), 6 t (gray iron).'
      }
    ],
    labTitle: 'Laboratory',
    labLead: 'Certified laboratory for mechanical and chemical testing and quality control.',
    labBody: 'Spectrometer, microscope, Brinell tester, Charpy pendulum, tensile tester, ultrasound, and magnetic flux.',
    labImageAlt: 'Laboratory',
    ctaTitle: 'We are ready for your inquiry!',
    ctaLead: 'Send requirements and specifications, our team is ready to respond promptly.',
    ctaButton: 'Contact us'
  },
  de: {
    title: 'Technische Ausstattung',
    lead: 'Komplette Technologie für Gießen, Wärmebehandlung und mechanische Bearbeitung.',
    equipmentItems: [
      {
        title: 'Induktionsöfen',
        body: 'Kapazität 2,5 t, mit Guss bis 3 t (Sphäro- und Stahlguss) und 6 t (Grauguss).'
      },
      {
        title: 'Sandaufbereitung',
        body: 'Alfaset-Verfahren und Sandregeneration.'
      },
      {
        title: 'Mischer und Verfahren',
        body: 'Mischer für Silikatmischung, ŠALKO-Verfahren, CO2 und Furanharze.'
      },
      {
        title: 'Strahlräume',
        body: 'Strahlräume mit Stahlkugelstrahlmaß 2200x1900x2500.'
      },
      {
        title: 'Wärmebehandlung',
        body: 'Öfen 10 t (2100x1400x3500) und Abschreckbecken 4000x3000x4000.'
      },
      {
        title: 'Mechanische Bearbeitung',
        body: 'Fräsmaschine, Drehmaschine und CNC-Maschinen für präzise Bearbeitung von Gussteilen.'
      }
    ],
    equipmentImageAlt: 'Ausstattung',
    capacitiesTitle: 'Kapazitäten',
    capacitiesLead: 'Stabile Produktion und Flexibilität für große Industrie-Gussteile.',
    capacitiesCards: [
      {
        title: '100 t/Monat',
        body: 'Aktuelle Produktionskapazität (geplant 1000 t/Monat).'
      },
      {
        title: '2,5 t',
        body: 'Kapazität der Induktionsöfen für einen stabilen Gießprozess.'
      },
      {
        title: '3-6 t',
        body: 'Maximales Gussteilgewicht: 3 t (Sphäro/Stahl), 6 t (Grauguss).'
      }
    ],
    labTitle: 'Labor',
    labLead: 'Zertifiziertes Labor für mechanische und chemische Prüfungen sowie Qualitätskontrolle.',
    labBody: 'Spektrometer, Mikroskop, Brinell, Charpy-Pendel, Zugprüfmaschine, Ultraschall und Magnetfluss.',
    labImageAlt: 'Labor',
    ctaTitle: 'Wir freuen uns auf Ihre Anfrage!',
    ctaLead: 'Senden Sie Anforderungen und Spezifikationen, unser Team antwortet schnell.',
    ctaButton: 'Kontaktieren Sie uns'
  }
};

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = SERVICES_COPY[language];

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
        <div className="stg-row stg-large-gap stg-valign-middle">
          <div className="stg-col-6 stg-tp-col-12">
            <ul className="bringer-detailed-list">
              {copy.equipmentItems.map((item) => (
                <li key={item.title}>
                  <div className="bringer-detailed-list-title">
                    <h4>{item.title}<span className="bringer-accent">.</span></h4>
                  </div>
                  <div className="bringer-detailed-list-description">
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/production-03.jpg"
                alt={copy.equipmentImageAlt}
                width={960}
                height={720}
                sizes={PARALLAX_SIZES}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>{copy.capacitiesTitle}</h2>
              <p className="bringer-large-text">{copy.capacitiesLead}</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          {copy.capacitiesCards.map((card, index) => (
            <div
              className={
                index === copy.capacitiesCards.length - 1
                  ? 'stg-col-4 stg-tp-col-12'
                  : 'stg-col-4 stg-tp-col-6 stg-m-bottom-gap'
              }
              key={card.title}
            >
              <div className="bringer-block">
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="laboratorija" className="backlight-bottom divider-top">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>{copy.labTitle}</h2>
            <p className="bringer-large-text">{copy.labLead}</p>
            <p>{copy.labBody}</p>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/production-04.jpg"
                alt={copy.labImageAlt}
                width={960}
                height={720}
                sizes={PARALLAX_SIZES}
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

