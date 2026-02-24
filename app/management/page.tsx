import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
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

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
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
const DIRECTOR_SIZES = '(max-width: 739px) 80vw, (max-width: 1200px) 40vw, 25vw';

type TeamMember = {
  name: string;
  profession: string;
  role: string;
  image: string;
  imagePosition?: string;
};

const MANAGEMENT_TEAM: Record<Language, TeamMember[]> = {
  sr: [
    {
      name: 'Dragoljub Maksimovic',
      profession: 'Dipl. inž. metalurgije',
      role: 'Direktor i vlasnik',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Milos Radivojevic',
      profession: 'Dipl. inž. mašinstva',
      role: 'Tehnički direktor',
      image: '/img/milos.jpg'
    },
    {
      name: 'Dragan Drenic',
      profession: 'Dipl. ekon.',
      role: 'Komercijalni direktor',
      image: '/img/dragandrenic.jpg',
      imagePosition: 'center top'
    },
    {
      name: 'Vladimir Stojkovic',
      profession: 'Dipl. pravnik',
      role: 'Direktor kadrovske i pravne službe',
      image: '/img/team/team03-thmb.jpg'
    },
    {
      name: 'Marina Radenkovic',
      profession: 'Mašinski tehničar',
      role: 'Rukovodilac odeljenja čistionice i mašinske obrade',
      image: '/img/team/team03-thmb.jpg'
    }
  ],
  en: [
    {
      name: 'Dragoljub Maksimovic',
      profession: 'Dipl. met. eng.',
      role: 'Owner and Director',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Milos Radivojevic',
      profession: 'Dipl. mech. eng.',
      role: 'Technical Director',
      image: '/img/milos.jpg'
    },
    {
      name: 'Dragan Drenic',
      profession: 'B.Sc. Econ.',
      role: 'Commercial Director',
      image: '/img/dragandrenic.jpg',
      imagePosition: 'center top'
    },
    {
      name: 'Vladimir Stojkovic',
      profession: 'LL.B.',
      role: 'Director of HR and Legal Services',
      image: '/img/team/team03-thmb.jpg'
    },
    {
      name: 'Marina Radenkovic',
      profession: 'Mechanical Technician',
      role: 'Head of Cleaning and Machining Department',
      image: '/img/team/team03-thmb.jpg'
    }
  ],
  de: [
    {
      name: 'Dragoljub Maksimovic',
      profession: 'Dipl.-Ing. Metallurgie',
      role: 'Inhaber und Direktor',
      image: '/img/team/team01-thmb.jpg'
    },
    {
      name: 'Milos Radivojevic',
      profession: 'Dipl.-Ing. Maschinenbau',
      role: 'Technischer Direktor',
      image: '/img/milos.jpg'
    },
    {
      name: 'Dragan Drenic',
      profession: 'Dipl.-Kfm.',
      role: 'Kaufmännischer Direktor',
      image: '/img/dragandrenic.jpg',
      imagePosition: 'center top'
    },
    {
      name: 'Vladimir Stojkovic',
      profession: 'Dipl. Jurist',
      role: 'Leiter Personal- und Rechtsdienst',
      image: '/img/team/team03-thmb.jpg'
    },
    {
      name: 'Marina Radenkovic',
      profession: 'Maschinentechnikerin',
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
    lead: 'Sema menadzmenta Kopex MIN-LIV D.O.O. Niš sa jasnim funkcijama odgovornosti.',
    sectionTitle: 'Menadzment',
    sectionLead: 'Ključni ljudi koji koordinisu proizvodnju, kvalitet, tehnicki razvoj i prodaju.',
    ctaTitle: '',
    ctaLead: 'Za poslovne upite i saradnju, nas tim je spreman da pruži sve potrebne informacije.',
    ctaButton: 'Kontaktirajte nas'
  },
  en: {
    title: 'Company Management',
    lead: 'Management structure of Kopex MIN-LIV D.O.O. Niš with clear responsibilities.',
    sectionTitle: 'Management team',
    sectionLead: 'Key people coordinating production, quality, technical development, and sales.',
    ctaTitle: '',
    ctaLead: 'For business inquiries and cooperation, our team is ready to provide the needed information.',
    ctaButton: 'Contact us'
  },
  de: {
    title: 'Geschäftsleitung',
    lead: 'Organisationsstruktur der Kopex MIN-LIV D.O.O. Niš mit klaren Verantwortlichkeiten.',
    sectionTitle: 'Management',
    sectionLead: 'Schlüsselpersonen für Produktion, Qualität, technische Entwicklung und Vertrieb.',
    ctaTitle: '',
    ctaLead: 'Für geschäftliche Anfragen und Zusammenarbeit steht unser Team gerne zur Verfügung.',
    ctaButton: 'Kontaktieren Sie uns'
  }
};

export default async function ManagementPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
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

        {/* Director — centered, larger photo, above the rest */}
        <div className="stg-row" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div className="stg-col-4 stg-tp-col-6 stg-m-col-12">
            <div className="bringer-block align-center kopex-team-card">
              <div className="kopex-team-photo" style={{ width: '100%', maxWidth: '320px', margin: '0 auto 1.25rem' }}>
                <Image
                  src={team[0].image}
                  alt={team[0].name}
                  width={960}
                  height={960}
                  sizes={DIRECTOR_SIZES}
                  style={team[0].imagePosition ? { objectPosition: team[0].imagePosition } : undefined}
                />
              </div>
              <h4 style={{ marginBottom: '0.25rem' }}>{team[0].name}</h4>
              <p style={{ margin: '0 0 0.15rem', opacity: 0.7 }}>{team[0].profession}</p>
              <p style={{ margin: 0 }}>{team[0].role}</p>
            </div>
          </div>
        </div>

        {/* Rest of the team */}
        <div className="stg-row">
          {team.slice(1).map((member) => (
            <div className="stg-col-3 stg-tp-col-6 stg-m-bottom-gap" key={member.name}>
              <div className="bringer-block align-center kopex-team-card">
                <div className="kopex-team-photo">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={720}
                    height={720}
                    sizes={CARD_SIZES}
                    style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                  />
                </div>
                <h5 style={{ marginBottom: '0.25rem' }}>{member.name}</h5>
                <p style={{ margin: '0 0 0.15rem', opacity: 0.7 }}>{member.profession}</p>
                <p style={{ margin: 0 }}>{member.role}</p>
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
