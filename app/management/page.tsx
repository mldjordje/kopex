import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Rukovodstvo firme',
  description: 'Organizaciona sema rukovodstva KOPEX MIN-LIV A.D. Ni\u0161 sa funkcijama tima.'
};

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const MANAGEMENT_TEAM: Record<Language, Array<{ name: string; role: string; image: string }>> = {
  sr: [
    {
      name: 'Generalni direktor',
      role: 'Strategija, razvoj i ukupno poslovno rukovodjenje',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Direktor proizvodnje',
      role: 'Planiranje proizvodnje, kapaciteti i optimizacija procesa',
      image: '/img/team/team02-thmb.jpg'
    },
    {
      name: 'Direktor kvaliteta',
      role: 'Laboratorijska ispitivanja, sertifikati i kontrola kvaliteta',
      image: '/img/team/team03-thmb.jpg'
    },
    {
      name: 'Direktor tehnike',
      role: 'Masinska i termicka obrada, odrzavanje i tehnoloski razvoj',
      image: '/img/team/team04-thmb.jpg'
    },
    {
      name: 'Direktor prodaje',
      role: 'Komunikacija sa kupcima, ponude i ugovaranje',
      image: '/img/team/team05-thmb.jpg'
    }
  ],
  en: [
    {
      name: 'General Manager',
      role: 'Strategy, development, and overall business leadership',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Production Director',
      role: 'Production planning, capacity management, and process optimization',
      image: '/img/team/team02-thmb.jpg'
    },
    {
      name: 'Quality Director',
      role: 'Laboratory testing, certifications, and quality assurance',
      image: '/img/team/team03-thmb.jpg'
    },
    {
      name: 'Technical Director',
      role: 'Machining, heat treatment, maintenance, and technology development',
      image: '/img/team/team04-thmb.jpg'
    },
    {
      name: 'Sales Director',
      role: 'Customer communication, offers, and contract management',
      image: '/img/team/team05-thmb.jpg'
    }
  ],
  de: [
    {
      name: 'Geschäftsführer',
      role: 'Strategie, Entwicklung und Gesamtverantwortung',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Produktionsleiter',
      role: 'Produktionsplanung, Kapazitätssteuerung und Prozessoptimierung',
      image: '/img/team/team02-thmb.jpg'
    },
    {
      name: 'Qualitätsleiter',
      role: 'Laborprüfungen, Zertifizierungen und Qualitätssicherung',
      image: '/img/team/team03-thmb.jpg'
    },
    {
      name: 'Technischer Leiter',
      role: 'Mechanische Bearbeitung, Wärmebehandlung, Wartung und Technologieentwicklung',
      image: '/img/team/team04-thmb.jpg'
    },
    {
      name: 'Vertriebsleiter',
      role: 'Kundenkommunikation, Angebote und Vertragsmanagement',
      image: '/img/team/team05-thmb.jpg'
    }
  ]
};

const MANAGEMENT_COPY: Record<Language, {
  title: string;
  lead: string;
  sectionTitle: string;
  sectionLead: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
}> = {
  sr: {
    title: 'Rukovodstvo firme',
    lead: 'Sema menadzmenta Kopex MIN-LIV A.D. Niš sa jasnim funkcijama odgovornosti.',
    sectionTitle: 'Menadzment',
    sectionLead: 'Ključni ljudi koji koordinisu proizvodnju, kvalitet, tehnicki razvoj i prodaju.',
    ctaTitle: 'Kontakt sa rukovodstvom',
    ctaLead: 'Za poslovne upite i saradnju, nas tim je spreman da pruži sve potrebne informacije.',
    ctaButton: 'Kontaktirajte nas'
  },
  en: {
    title: 'Company Management',
    lead: 'Management structure of Kopex MIN-LIV A.D. Niš with clear responsibilities.',
    sectionTitle: 'Management team',
    sectionLead: 'Key people coordinating production, quality, technical development, and sales.',
    ctaTitle: 'Contact the management team',
    ctaLead: 'For business inquiries and cooperation, our team is ready to provide the needed information.',
    ctaButton: 'Contact us'
  },
  de: {
    title: 'Geschäftsleitung',
    lead: 'Organisationsstruktur der Kopex MIN-LIV A.D. Niš mit klaren Verantwortlichkeiten.',
    sectionTitle: 'Management',
    sectionLead: 'Schlüsselpersonen für Produktion, Qualität, technische Entwicklung und Vertrieb.',
    ctaTitle: 'Kontakt zur Geschäftsleitung',
    ctaLead: 'Für geschäftliche Anfragen und Zusammenarbeit steht unser Team gerne zur Verfügung.',
    ctaButton: 'Kontaktieren Sie uns'
  }
};

export default async function ManagementPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = MANAGEMENT_COPY[language];
  const team = MANAGEMENT_TEAM[language];

  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row">
          <div className="stg-col-8 stg-offset-2 align-center stg-tp-col-10 stg-tp-offset-1">
            <h1 className="bringer-page-title">{copy.title}</h1>
            <p className="bringer-large-text">
              {copy.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="divider-bottom">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>{copy.sectionTitle}</h2>
              <p className="bringer-large-text">
                {copy.sectionLead}
              </p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          {team.map((member) => (
            <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap" key={member.name}>
              <div className="bringer-block align-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={720}
                  height={720}
                  sizes={CARD_SIZES}
                />
                <h5>{member.name}</h5>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="align-center stg-bottom-gap-l">
          <h2>{copy.ctaTitle}</h2>
          <p className="bringer-large-text">
            {copy.ctaLead}
          </p>
        </div>
        <div className="align-center">
          <Link href="/contacts" className="bringer-button">{copy.ctaButton}</Link>
        </div>
      </section>
    </div>
  );
}
