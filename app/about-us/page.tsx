import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const ABOUT_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | O nama',
    description: 'Istorijat livnice KOPEX MIN-LIV, kapaciteti, laboratorija i sertifikati kvaliteta.',
    keywords: ['o nama', 'istorijat', 'kapaciteti', 'laboratorija', 'sertifikati', 'Kopex MIN-LIV']
  },
  en: {
    title: 'KOPEX MIN-LIV | About us',
    description: 'History of the KOPEX MIN-LIV foundry, capacity, laboratory, and quality certifications.',
    keywords: ['about us', 'history', 'capacity', 'laboratory', 'certifications', 'KOPEX MIN-LIV']
  },
  de: {
    title: 'KOPEX MIN-LIV | Uber uns',
    description: 'Geschichte der KOPEX MIN-LIV Giesserei, Kapazitat, Labor und Qualitatszertifikate.',
    keywords: ['uber uns', 'geschichte', 'kapazitat', 'labor', 'zertifikate', 'KOPEX MIN-LIV']
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = ABOUT_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/about-us?lang=${language}`
  });
}

const HALF_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 90vw, 50vw';
const THIRD_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';
const CERT_SOURCES = [
  '/img/kopex/certs/iso-9001.jpg',
  '/img/kopex/certs/iso-14001.jpg',
  '/img/kopex/certs/iso-45001.jpg'
];

const ABOUT_COPY: Record<Language, {
  title: string;
  lead: string;
  historyTitle: string;
  historyItems: Array<{ year: string; body: string }>;
  historyImageAlt: string;
  capacitiesTitle: string;
  capacitiesLead: string;
  capacitiesBody: string;
  capacitiesBody2: string;
  capacitiesLink: string;
  capacitiesImageAlt: string;
  labTitle: string;
  labLead: string;
  labBody: string;
  labImageAlt: string;
  productsTitle: string;
  productsLead: string;
  productItems: Array<{ title: string; body: string; image: { src: string; alt: string } }>;
  clientsTitle: string;
  clientsLead: string;
  clientsDomesticTitle: string;
  clientsDomesticList: string;
  clientsForeignTitle: string;
  clientsForeignList: string;
  certsTitle: string;
  certsLead: string;
  certAlt9001: string;
  certAlt14001: string;
  certAlt45001: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
}> = {
  sr: {
    title: 'O nama',
    lead: 'Livnica KOPEX MIN-LIV A.D. Niš sa tradicijom dužom od jednog veka.',
    historyTitle: 'Istorijat',
    historyItems: [
      { year: '1884', body: 'Osnivanje livnice u sastavu radionica za popravku železničkih vozila.' },
      { year: '1885', body: 'Početak proizvodnje odlivaka u okviru tadašnjih železničkih radionica.' },
      { year: '2010', body: 'Privatizacija od strane poljske grupacije "Kopex SA".' },
      { year: '2020', body: 'Prelazak u privatno vlasništvo i nastavak modernizacije.' }
    ],
    historyImageAlt: 'Kopex MIN-LIV istorijat',
    capacitiesTitle: 'Kapaciteti i oprema',
    capacitiesLead: 'Indukcione peći kapaciteta 2,5 t, priprema peska za više tehnologija i savremena termička obrada.',
    capacitiesBody: 'Kapacitet proizvodnje iznosi 100 t mesečno (projektovano 1000 t mesečno), uz mogućnost izrade odlivaka do 3 t (nodularni i čelični liv) i do 6 t (sivi liv).',
    capacitiesBody2: 'Radionica za mašinsku obradu obuhvata glodalicu, strug i CNC mašine.',
    capacitiesLink: 'Detalji opreme',
    capacitiesImageAlt: 'Tehnička opremljenost',
    labTitle: 'Laboratorija',
    labLead: 'Sertifikovana laboratorija za mehanička i hemijska ispitivanja i kontrolu kvaliteta.',
    labBody: 'Oprema obuhvata kvantometar, mikroskop, brinel, Sarpijevo klatno, kidalicu, ultrazvuk i magnetni fluks.',
    labImageAlt: 'Laboratorija',
    productsTitle: 'Proizvodi',
    productsLead: 'Odlivci od sivog, nodularnog i čeličnog liva, kao i legirani čelici.',
    productItems: [
      {
        title: 'Sivi liv',
        body: 'Stabilna serijska proizvodnja i pouzdan kvalitet.',
        image: { src: '/img/portfolio/portfolio07.jpg', alt: 'Sivi liv - odlivci' }
      },
      {
        title: 'Nodularni liv',
        body: 'Visoke mehaničke osobine i dug vek trajanja.',
        image: { src: '/img/portfolio/portfolio02.jpg', alt: 'Nodularni liv - odlivci' }
      },
      {
        title: 'Čelični liv',
        body: 'Specijalizacija za legirane i manganske čelike.',
        image: { src: '/img/portfolio/portfolio04.jpg', alt: 'Čelični liv - odlivci' }
      }
    ],
    clientsTitle: 'Kupci',
    clientsLead: 'Domaći i inostrani partneri iz industrije, energetike i rudarstva.',
    clientsDomesticTitle: 'Domaći kupci',
    clientsDomesticList: 'EPS Srbija (Kolubara, Kostolac, TE Obrenovac), D-Company Babušnica, Lafarge Srbija (Beočin), HBIS (Železara Smederevo), ZI JIN (RTB) Bor, Titan Srbija (Kosjerić), Wolong Bor, Metalfer železara i drugi.',
    clientsForeignTitle: 'Inostrani kupci',
    clientsForeignList: 'LKR i Litostroj (Slovenija), Modelform (Poljska), Danieli (Austrija), Đuro Đaković, CIAK (Hrvatska), Alumina (BIH), Arbal, Bulqizë (Albanija), TE Bitolj, MZT Pumpe, May Komerc (Makedonija), Ganz, Jász plasztic (Mađarska), KEK (Kosovo), MAK Kotanidis (Grčka).',
    certsTitle: 'Sertifikati',
    certsLead: 'Kvalitet potvrđen sertifikatima i standardima proizvodnje.',
    certAlt9001: 'ISO 9001 sertifikat',
    certAlt14001: 'ISO 14001 sertifikat',
    certAlt45001: 'ISO 45001 sertifikat',
    ctaTitle: 'Očekujemo vaš upit!',
    ctaLead: 'Pošaljite zahteve i specifikacije, naš tim je spreman da odgovori u najkraćem roku.',
    ctaButton: 'Kontaktirajte nas'
  },
  en: {
    title: 'About us',
    lead: 'KOPEX MIN-LIV A.D. Niš foundry with a tradition longer than a century.',
    historyTitle: 'History',
    historyItems: [
      { year: '1884', body: 'Foundry founded as part of railway vehicle repair workshops.' },
      { year: '1885', body: 'Start of casting production within the then railway workshops.' },
      { year: '2010', body: 'Privatization by the Polish group "Kopex SA".' },
      { year: '2020', body: 'Transition to private ownership and continued modernization.' }
    ],
    historyImageAlt: 'Kopex MIN-LIV history',
    capacitiesTitle: 'Capacity and equipment',
    capacitiesLead: 'Induction furnaces with 2.5 t capacity, sand preparation for multiple technologies, and modern heat treatment.',
    capacitiesBody: 'Production capacity is 100 t per month (planned 1000 t per month), with casting capability up to 3 t (ductile and steel) and up to 6 t (gray iron).',
    capacitiesBody2: 'The machining workshop includes a milling machine, lathe, and CNC machines.',
    capacitiesLink: 'Equipment details',
    capacitiesImageAlt: 'Technical equipment',
    labTitle: 'Laboratory',
    labLead: 'Certified laboratory for mechanical and chemical testing and quality control.',
    labBody: 'Equipment includes a spectrometer, microscope, Brinell tester, Charpy pendulum, tensile tester, ultrasound, and magnetic flux.',
    labImageAlt: 'Laboratory',
    productsTitle: 'Products',
    productsLead: 'Castings of gray iron, ductile iron, and steel, as well as alloyed steels.',
    productItems: [
      {
        title: 'Gray iron',
        body: 'Stable series production and reliable quality.',
        image: { src: '/img/portfolio/portfolio07.jpg', alt: 'Gray iron - castings' }
      },
      {
        title: 'Ductile iron',
        body: 'High mechanical properties and long service life.',
        image: { src: '/img/portfolio/portfolio02.jpg', alt: 'Ductile iron - castings' }
      },
      {
        title: 'Steel castings',
        body: 'Specialization in alloyed and manganese steels.',
        image: { src: '/img/portfolio/portfolio04.jpg', alt: 'Steel castings' }
      }
    ],
    clientsTitle: 'Clients',
    clientsLead: 'Domestic and international partners from industry, energy, and mining.',
    clientsDomesticTitle: 'Domestic clients',
    clientsDomesticList: 'EPS Serbia (Kolubara, Kostolac, TPP Obrenovac), D-Company Babušnica, Lafarge Serbia (Beočin), HBIS (Smederevo Steel Plant), ZI JIN (RTB) Bor, Titan Serbia (Kosjerić), Wolong Bor, Metalfer Steel Plant, and others.',
    clientsForeignTitle: 'International clients',
    clientsForeignList: 'LKR and Litostroj (Slovenia), Modelform (Poland), Danieli (Austria), Đuro Đaković, CIAK (Croatia), Alumina (Bosnia and Herzegovina), Arbal, Bulqizë (Albania), TPP Bitolj, MZT Pumps, May Komerc (North Macedonia), Ganz, Jász plasztic (Hungary), KEK (Kosovo), MAK Kotanidis (Greece).',
    certsTitle: 'Certificates',
    certsLead: 'Quality confirmed by certificates and production standards.',
    certAlt9001: 'ISO 9001 certificate',
    certAlt14001: 'ISO 14001 certificate',
    certAlt45001: 'ISO 45001 certificate',
    ctaTitle: 'We look forward to your inquiry!',
    ctaLead: 'Send requests and specifications, our team is ready to respond promptly.',
    ctaButton: 'Contact us'
  },
  de: {
    title: 'Über uns',
    lead: 'KOPEX MIN-LIV A.D. Niš Gießerei mit einer Tradition von über einem Jahrhundert.',
    historyTitle: 'Geschichte',
    historyItems: [
      { year: '1884', body: 'Gründung der Gießerei als Teil von Werkstätten zur Reparatur von Eisenbahnfahrzeugen.' },
      { year: '1885', body: 'Beginn der Gussproduktion innerhalb der damaligen Eisenbahnwerkstätten.' },
      { year: '2010', body: 'Privatisierung durch die polnische Gruppe "Kopex SA".' },
      { year: '2020', body: 'Übergang in privates Eigentum und weitere Modernisierung.' }
    ],
    historyImageAlt: 'Kopex MIN-LIV Geschichte',
    capacitiesTitle: 'Kapazitäten und Ausstattung',
    capacitiesLead: 'Induktionsöfen mit 2,5 t Kapazität, Sandaufbereitung für mehrere Technologien und moderne Wärmebehandlung.',
    capacitiesBody: 'Die Produktionskapazität beträgt 100 t pro Monat (geplant 1000 t pro Monat), mit Guss bis 3 t (Sphäro- und Stahlguss) und bis 6 t (Grauguss).',
    capacitiesBody2: 'Die mechanische Werkstatt umfasst Fräsmaschine, Drehmaschine und CNC-Maschinen.',
    capacitiesLink: 'Ausstattung im Detail',
    capacitiesImageAlt: 'Technische Ausstattung',
    labTitle: 'Labor',
    labLead: 'Zertifiziertes Labor für mechanische und chemische Prüfungen sowie Qualitätskontrolle.',
    labBody: 'Zur Ausstattung gehören Spektrometer, Mikroskop, Brinell, Charpy-Pendel, Zugprüfmaschine, Ultraschall und Magnetfluss.',
    labImageAlt: 'Labor',
    productsTitle: 'Produkte',
    productsLead: 'Gussteile aus Grauguss, Sphäroguss und Stahlguss sowie legierte Stähle.',
    productItems: [
      {
        title: 'Grauguss',
        body: 'Stabile Serienfertigung und zuverlässige Qualität.',
        image: { src: '/img/portfolio/portfolio07.jpg', alt: 'Grauguss - Gussteile' }
      },
      {
        title: 'Sphäroguss',
        body: 'Hohe mechanische Eigenschaften und lange Lebensdauer.',
        image: { src: '/img/portfolio/portfolio02.jpg', alt: 'Sphäroguss - Gussteile' }
      },
      {
        title: 'Stahlguss',
        body: 'Spezialisierung auf legierte und manganhaltige Stähle.',
        image: { src: '/img/portfolio/portfolio04.jpg', alt: 'Stahlguss - Gussteile' }
      }
    ],
    clientsTitle: 'Kunden',
    clientsLead: 'Inländische und internationale Partner aus Industrie, Energie und Bergbau.',
    clientsDomesticTitle: 'Inländische Kunden',
    clientsDomesticList: 'EPS Serbien (Kolubara, Kostolac, TPP Obrenovac), D-Company Babušnica, Lafarge Serbien (Beočin), HBIS (Stahlwerk Smederevo), ZI JIN (RTB) Bor, Titan Serbien (Kosjerić), Wolong Bor, Metalfer Stahlwerk und weitere.',
    clientsForeignTitle: 'Ausländische Kunden',
    clientsForeignList: 'LKR und Litostroj (Slowenien), Modelform (Polen), Danieli (Österreich), Đuro Đaković, CIAK (Kroatien), Alumina (Bosnien und Herzegowina), Arbal, Bulqizë (Albanien), TPP Bitolj, MZT Pumpe, May Komerc (Nordmazedonien), Ganz, Jász plasztic (Ungarn), KEK (Kosovo), MAK Kotanidis (Griechenland).',
    certsTitle: 'Zertifikate',
    certsLead: 'Qualität bestätigt durch Zertifikate und Produktionsstandards.',
    certAlt9001: 'ISO 9001 Zertifikat',
    certAlt14001: 'ISO 14001 Zertifikat',
    certAlt45001: 'ISO 45001 Zertifikat',
    ctaTitle: 'Wir freuen uns auf Ihre Anfrage!',
    ctaLead: 'Senden Sie Anforderungen und Spezifikationen, unser Team ist bereit, zeitnah zu antworten.',
    ctaButton: 'Kontaktieren Sie uns'
  }
};

export default async function AboutPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = ABOUT_COPY[language];

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
          <div className="stg-col-6">
            <h2>{copy.historyTitle}</h2>
            <ul className="bringer-detailed-list bringer-detailed-list--mobile-details">
              {copy.historyItems.map((item) => (
                <li key={item.year}>
                  <div className="bringer-detailed-list-title">
                    <h4>{item.year}<span className="bringer-accent">.</span></h4>
                  </div>
                  <div className="bringer-detailed-list-description">
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/facility-front.jpg"
                alt={copy.historyImageAlt}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-top">
        <div className="stg-row stg-large-gap stg-valign-middle">
          <div className="stg-col-6 stg-tp-col-12">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/slides/page-04.jpg"
                alt={copy.capacitiesImageAlt}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h2>{copy.capacitiesTitle}</h2>
            <p className="bringer-large-text">{copy.capacitiesLead}</p>
            <p>{copy.capacitiesBody}</p>
            <p>{copy.capacitiesBody2}</p>
            <div className="align-right">
              <Link href="/services" className="bringer-arrow-link">{copy.capacitiesLink}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-bottom divider-top" id="laboratorija">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>{copy.labTitle}</h2>
            <p className="bringer-large-text">{copy.labLead}</p>
            <p>{copy.labBody}</p>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/slides/page-05.jpg"
                alt={copy.labImageAlt}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>{copy.productsTitle}</h2>
              <p className="bringer-large-text">{copy.productsLead}</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          {copy.productItems.map((item, index) => (
            <div
              className={
                index === copy.productItems.length - 1
                  ? 'stg-col-4 stg-tp-col-12'
                  : 'stg-col-4 stg-tp-col-6 stg-m-bottom-gap'
              }
              key={item.title}
            >
              <div className="bringer-block">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={960}
                  height={720}
                  sizes={THIRD_SIZES}
                />
                <h5>{item.title}</h5>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="backlight-top divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>{copy.clientsTitle}</h2>
              <p className="bringer-large-text">{copy.clientsLead}</p>
            </div>
          </div>
        </div>
        <div className="stg-row stg-large-gap">
          <div className="stg-col-6 stg-tp-col-12">
            <h5>{copy.clientsDomesticTitle}</h5>
            <p>{copy.clientsDomesticList}</p>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h5>{copy.clientsForeignTitle}</h5>
            <p>{copy.clientsForeignList}</p>
          </div>
        </div>
      </section>

      <section className="backlight-bottom divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>{copy.certsTitle}</h2>
              <p className="bringer-large-text">{copy.certsLead}</p>
            </div>
          </div>
        </div>
        <div className="kopex-cert-grid">
          {[
            { src: CERT_SOURCES[0], alt: copy.certAlt9001 },
            { src: CERT_SOURCES[1], alt: copy.certAlt14001 },
            { src: CERT_SOURCES[2], alt: copy.certAlt45001 }
          ].map((cert) => (
            <div className="kopex-cert-card" key={cert.src}>
              <Image src={cert.src} alt={cert.alt} width={2252} height={4000} sizes={THIRD_SIZES} />
            </div>
          ))}
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
