import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const MANAGEMENT_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Rukovodstvo firme',
    description: 'Rukovodstvo i organizaciona struktura KOPEX MIN-LIV sa funkcijama tima.',
    keywords: ['rukovodstvo', 'menadzment', 'organizacija', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | Company management',
    description: 'Management structure and key roles within KOPEX MIN-LIV.',
    keywords: ['management', 'leadership', 'organization', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Geschaftsleitung',
    description: 'Managementstruktur und Schlusselfunktionen bei KOPEX MIN-LIV.',
    keywords: ['geschaftsleitung', 'management', 'organisation', 'KOPEX MIN-LIV']
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = MANAGEMENT_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/management?lang=${language}`
  });
}

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const MANAGEMENT_TEAM: Record<Language, Array<{ name: string; role: string; image: string }>> = {
  sr: [
    {
      name: 'Dragoljub Maksimovic, dipl. Inz. metalurgije',
      role: 'Direktor i vlasnik',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Milos Radivojevic, dipl. Inz. masinstva',
      role: 'Tehnicki direktor',
      image: '/img/team/team02-thmb.jpg'
    },
    {
      name: 'Dragan Drenic, dipl. ekon.',
      role: 'Komercijalni direktor',
      image: '/img/dragandrenic.jpg'
    },
    {
      name: 'Marina Radenovic',
      role: 'Rukovodilac odeljenja cistionice i masinske obrade',
      image: '/img/team/team03-thmb.jpg'
    }
  ],
  en: [
    {
      name: 'Dragoljub Maksimovic, dipl. Inz. metalurgije',
      role: 'Owner and Director',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Milos Radivojevic, dipl. Inz. masinstva',
      role: 'Technical Director',
      image: '/img/team/team02-thmb.jpg'
    },
    {
      name: 'Dragan Drenic, dipl. ekon.',
      role: 'Commercial Director',
      image: '/img/dragandrenic.jpg'
    },
    {
      name: 'Marina Radenovic',
      role: 'Head of Cleaning and Machining Department',
      image: '/img/team/team03-thmb.jpg'
    }
  ],
  de: [
    {
      name: 'Dragoljub Maksimovic, dipl. Inz. metalurgije',
      role: 'Inhaber und Direktor',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Milos Radivojevic, dipl. Inz. masinstva',
      role: 'Technischer Direktor',
      image: '/img/team/team02-thmb.jpg'
    },
    {
      name: 'Dragan Drenic, dipl. ekon.',
      role: 'Kaufmaennischer Direktor',
      image: '/img/dragandrenic.jpg'
    },
    {
      name: 'Marina Radenovic',
      role: 'Leiterin der Putzerei und mechanischen Bearbeitung',
      image: '/img/team/team03-thmb.jpg'
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
    ctaTitle: '',
    ctaLead: 'Za poslovne upite i saradnju, nas tim je spreman da pruži sve potrebne informacije.',
    ctaButton: 'Kontaktirajte nas'
  },
  en: {
    title: 'Company Management',
    lead: 'Management structure of Kopex MIN-LIV A.D. Niš with clear responsibilities.',
    sectionTitle: 'Management team',
    sectionLead: 'Key people coordinating production, quality, technical development, and sales.',
    ctaTitle: '',
    ctaLead: 'For business inquiries and cooperation, our team is ready to provide the needed information.',
    ctaButton: 'Contact us'
  },
  de: {
    title: 'Geschäftsleitung',
    lead: 'Organisationsstruktur der Kopex MIN-LIV A.D. Niš mit klaren Verantwortlichkeiten.',
    sectionTitle: 'Management',
    sectionLead: 'Schlüsselpersonen für Produktion, Qualität, technische Entwicklung und Vertrieb.',
    ctaTitle: '',
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
          {copy.ctaTitle ? <h2>{copy.ctaTitle}</h2> : null}
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
