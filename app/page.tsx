import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import HeroVideo from '@/components/HeroVideo';
import { getNewsList } from '@/lib/news';
import { getProductsList } from '@/lib/products';
import type { NewsItem } from '@/lib/news';
import type { ProductItem } from '@/lib/products';
import { getLanguageLocale, LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Industrijska livnica gvo\u017e\u0111a i \u010delika Ni\u0161',
  description:
    'Kopex MIN-LIV A.D. Ni\u0161 je industrijska livnica Srbije za livenje metala i proizvodnju metalnih odlivaka: sivi liv, nodularni liv i \u010deli\u010dni liv, uz mehani\u010dku obradu metala (machining), termi\u010dku obradu, sa\u010dmarenje/pe\u0161karenje i kontrolu kvaliteta.'
};

export const dynamic = 'force-dynamic';

const CARD_SIZES = '(max-width: 739px) 100vw, (max-width: 1024px) 50vw, 33vw';
const HALF_SIZES = '(max-width: 991px) 100vw, 50vw';
const MEDIA_LARGE_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 60vw, 33vw';
const MEDIA_SMALL_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 40vw, 17vw';
const CERT_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 50vw, 33vw';

const HOME_COPY: Record<Language, {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroTrust: string;
  productsEyebrow: string;
  productsTitle: string;
  productsLead: string;
  productsCta: string;
  newsEyebrow: string;
  newsTitle: string;
  newsLead: string;
  newsCta: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesLead: string;
  service01Title: string;
  service01Body: string;
  service02Title: string;
  service02Body: string;
  service03Title: string;
  service03Body: string;
  service04Title: string;
  service04Body: string;
  service05Title: string;
  service05Body: string;
  heroStats: [string, string, string];
  productNoImage: string;
  productView: string;
  productEmpty: string;
  productNoDescription: string;
  newsNoImage: string;
  newsEmpty: string;
  storyEyebrow: string;
  storyTitle: string;
  storyLead: string;
  storyBody: string;
  storyHighlights: [string, string, string];
  storyLink: string;
  storyImageAlt1: string;
  storyImageAlt2: string;
  equipmentEyebrow: string;
  equipmentTitle: string;
  equipmentLead: string;
  equipmentImageAlt1: string;
  equipmentImageAlt2: string;
  equipmentImageAlt3: string;
  equipmentImageAlt4: string;
  equipmentCard1Title: string;
  equipmentCard1Body: string;
  equipmentCard2Title: string;
  equipmentCard2Body: string;
  equipmentCard3Title: string;
  equipmentCard3Body: string;
  equipmentCard4Title: string;
  equipmentCard4Body: string;
  equipmentLink: string;
  qualityEyebrow: string;
  qualityTitle: string;
  qualityLead: string;
  qualityBullet1: string;
  qualityBullet2: string;
  qualityBullet3: string;
  qualityLink: string;
  qualityImageAlt: string;
  clientsEyebrow: string;
  clientsTitle: string;
  clientsLead: string;
  clientsDomesticTitle: string;
  clientsDomesticList: string;
  clientsForeignTitle: string;
  clientsForeignList: string;
  certsEyebrow: string;
  certsTitle: string;
  certsLead: string;
  certsDownload: string;
  certAlt9001: string;
  certAlt14001: string;
  certAlt45001: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
}> = {
  sr: {
    heroEyebrow: 'Niš • Industrijska livnica • Od 1884',
    heroTitle: 'Industrijska livnica gvožđa i čelika za odlivke koji traju.',
    heroLead:
      'Od prototipa do serijske proizvodnje: sivi liv, nodularni liv i čelični liv, uz mašinsku obradu, termičku obradu i potpunu kontrolu kvaliteta.',
    heroCtaPrimary: 'Pošaljite upit',
    heroCtaSecondary: 'Pogledajte kapacitete',
    heroTrust:
      'Partneri iz energetike, rudarstva i industrije: EPS, ZI JIN, Danieli, Lafarge, HBIS i drugi.',
    productsEyebrow: 'Proizvodi',
    productsTitle: 'Metalni odlivci za energetiku, rudarstvo i industriju.',
    productsLead:
      'Specijalizovani smo za sivi liv, nodularni liv i čelični liv, uključujući legirane čelike za zahtevne uslove rada.',
    productsCta: 'Svi proizvodi',
    newsEyebrow: 'Vesti / Karijera',
    newsTitle: 'Najnovije informacije i oglasi za posao iz Kopex MIN-LIV.',
    newsLead: 'Pratite najnovije objave, projekte i oglase za zapošljavanje iz naše livnice.',
    newsCta: 'Sve vesti / karijera',
    servicesEyebrow: 'Usluge',
    servicesTitle: 'Kompletan proizvodni ciklus na jednom mestu.',
    servicesLead: 'Od modelovanja i livenja do završne obrade, dokumentacije i isporuke.',
    service01Title: 'Kalupovanje i livenje',
    service01Body:
      'Izrada odlivaka po crtežima i standardima kupca, uz FLEKSIBILNOST MALOSERIJSKE I POJEDINAČNE PROIZVODNJE.',
    service02Title: 'Mašinska obrada',
    service02Body: 'Obrada na standardnim mašinama (glodalica, strug, borverk) i CNC mašinama.',
    service03Title: 'Termička obrada',
    service03Body:
      'Termičko tretiranje odlivaka kroz postupke: gašenja, kaljenja, popuštanja i žarenja u bazenima sa velikim kapacitetom quench emulzije ili vode radi optimalnih hemijskih i mehaničkih svojstava.',
    service04Title: 'Završne operacije',
    service04Body:
      'Finalizacija proizvoda kroz postupke: brušenje, farbanje, varenje i sačmarenje (peskarenje), radi što bolje površine i vizualno dopadljivijeg proizvoda.',
    service05Title: 'Kontrola kvaliteta',
    service05Body:
      'Sertifikovana laboratorija za hemijska i mehanička ispitivanja odlivaka sa kvantometrom, Sarpijevim klatnom i kidalicom, uključujući ispitivanja magnetnim fluksom i ultrazvukom.',
    heroStats: ['godina tradicije', 'projektovani kapacitet mesečno', 'kapacitet liva po peći'],
    productNoImage: 'Bez slike',
    productView: 'Pogledaj proizvod',
    productEmpty: 'Trenutno nema proizvoda.',
    productNoDescription: 'Bez opisa.',
    newsNoImage: 'Bez naslovne slike',
    newsEmpty: 'Trenutno nema vesti.',
    storyEyebrow: 'O nama',
    storyTitle: 'Livnica koja spaja tradiciju sa modernom proizvodnjom.',
    storyLead: 'Kopex MIN-LIV A.D. u Nišu je industrijska livnica gvožđa i čelika koja obuhvata razvoj, proizvodnju i kontrolu kvaliteta metalnih odlivaka.',
    storyBody: 'Privatizovana je 2010. godine i posluje u privatnom vlasništvu od 2020. godine, sa fokusom na pouzdane rokove isporuke i stabilan kvalitet.',
    storyHighlights: ['početak proizvodnje', 'trenutni kapacitet mesečno', 'projektovani kapacitet'],
    storyLink: 'Više o nama',
    storyImageAlt1: 'Kopex MIN-LIV pogon',
    storyImageAlt2: 'Kompleks livnice',
    equipmentEyebrow: 'Opremljenost',
    equipmentTitle: 'Kapacitet i oprema za zahtevne industrijske serije.',
    equipmentLead: 'Savremena oprema i procesi omogućavaju stabilan kvalitet i pouzdane rokove isporuke.',
    equipmentImageAlt1: 'Livnička proizvodnja',
    equipmentImageAlt2: 'Proces livenja',
    equipmentImageAlt3: 'Kontrola procesa',
    equipmentImageAlt4: 'Mašinska obrada metala',
    equipmentCard1Title: 'Indukcione peći',
    equipmentCard1Body: 'Kapacitet 2,5 t, uz mogućnost liva do 3 t (nodularni i čelični) i 6 t (sivi liv).',
    equipmentCard2Title: 'Priprema peska',
    equipmentCard2Body: 'Bentonitna mešavina, furanske smole i estre, Alfaset postupak i regeneracija peska.',
    equipmentCard3Title: 'Termička obrada',
    equipmentCard3Body: 'Peći 10 t (2100x1400x3500) i bazeni za gašenje/kaljenje 4000x3000x4000.',
    equipmentCard4Title: 'Kontrola kvaliteta',
    equipmentCard4Body: 'Instrumenti za hemijska i mehanička ispitivanja, ultrazvuk i magnetni fluks.',
    equipmentLink: 'Detalji opremljenosti',
    qualityEyebrow: 'Laboratorija i kvalitet',
    qualityTitle: 'Potpuna kontrola kvaliteta od sirovine do isporuke.',
    qualityLead: 'Sertifikovana laboratorija obezbeđuje hemijska i mehanička ispitivanja metala, kao i kontrolu dimenzija i strukture.',
    qualityBullet1: 'Kvantometar, mikroskop, brinel, Sarpijevo klatno i kidalica.',
    qualityBullet2: 'Ultrazvuk i magnetni fluks za detekciju unutrašnjih nepravilnosti.',
    qualityBullet3: 'Izveštaji i dokumentacija u skladu sa zahtevima kupca.',
    qualityLink: 'Detalji laboratorije',
    qualityImageAlt: 'Laboratorija i kontrola kvaliteta',
    clientsEyebrow: 'Kupci',
    clientsTitle: 'Pouzdan dobavljač metalnih odlivaka u regionu i Evropi.',
    clientsLead: 'Partnerstva gradimo na stabilnom kvalitetu, rokovima i transparentnoj komunikaciji.',
    clientsDomesticTitle: 'Domaći kupci',
    clientsDomesticList: 'EPS Srbija (Kolubara, Kostolac, TE Obrenovac), D-Company Babušnica, Lafarge Srbija (Beočin), HBIS (Železara Smederevo), ZI JIN (RTB) Bor, Titan Srbija (Kosjerić), Wolong Bor, Metalfer železara i drugi.',
    clientsForeignTitle: 'Inostrani kupci',
    clientsForeignList: 'LKR i Litostroj (Slovenija), Modelform (Poljska), Danieli (Austrija), Đuro Đaković, CIAK (Hrvatska), Alumina (BIH), Arbal, Bulqizë (Albanija), TE Bitolj, MZT Pumpe, May Komerc (Makedonija), Ganz, Jász plasztic (Mađarska), KEK (Kosovo), MAK Kotanidis (Grčka).',
    certsEyebrow: 'Sertifikati',
    certsTitle: 'Sistem kvaliteta potvrđen sertifikatima i standardima.',
    certsLead: 'Kontinuirano usklađujemo procese sa zahtevima industrije i kupaca.',
    certsDownload: 'Preuzmi PDF sertifikat laboratorije',
    certAlt9001: 'ISO 9001 sertifikat',
    certAlt14001: 'ISO 14001 sertifikat',
    certAlt45001: 'ISO 45001 sertifikat',
    ctaTitle: 'Zahtev za ponudu i proizvodnju metalnih delova',
    ctaLead: 'Pošaljite specifikacije i crteže, a naš tim odgovara u najkraćem roku.',
    ctaButton: 'Kontaktirajte nas'
  },
  en: {
    heroEyebrow: 'Niš • Industrial foundry • Since 1884',
    heroTitle: 'Industrial iron and steel foundry for castings that last.',
    heroLead:
      'From prototypes to series production: gray iron, ductile iron, and steel castings, with machining, heat treatment, and full quality control.',
    heroCtaPrimary: 'Send inquiry',
    heroCtaSecondary: 'View capacities',
    heroTrust:
      'Partners in energy, mining, and industry: EPS, ZI JIN, Danieli, Lafarge, HBIS and others.',
    productsEyebrow: 'Products',
    productsTitle: 'Metal castings for energy, mining, and industry.',
    productsLead:
      'We specialize in gray iron, ductile iron, and steel castings, including alloyed steels for demanding operating conditions.',
    productsCta: 'All products',
    newsEyebrow: 'News / Careers',
    newsTitle: 'Latest news and job openings from Kopex MIN-LIV.',
    newsLead: 'Follow the latest updates, projects, and hiring announcements from our foundry.',
    newsCta: 'All news / careers',
    servicesEyebrow: 'Services',
    servicesTitle: 'A complete production cycle in one place.',
    servicesLead: 'From pattern making and casting to finishing, documentation, and delivery.',
    service01Title: 'Molding and casting',
    service01Body:
      'Casting production according to customer drawings and standards, with FLEXIBILITY FOR SMALL-SERIES AND SINGLE-PIECE PRODUCTION.',
    service02Title: 'Machining',
    service02Body: 'Processing on standard machines (milling, lathe, boring mill) and CNC machines.',
    service03Title: 'Heat treatment',
    service03Body:
      'Heat treatment of castings through quenching, hardening, tempering, and annealing in large-capacity quench emulsion or water baths for optimal chemical and mechanical properties.',
    service04Title: 'Final operations',
    service04Body:
      'Product finishing through grinding, painting, welding, and shot blasting (sandblasting) for improved surface quality and visual appearance.',
    service05Title: 'Quality control',
    service05Body:
      'Certified laboratory for chemical and mechanical testing of castings with spectrometer, Charpy pendulum, and tensile tester, including magnetic flux and ultrasonic testing.',
    heroStats: ['years of tradition', 'planned monthly capacity', 'melt capacity per furnace'],
    productNoImage: 'No image',
    productView: 'View product',
    productEmpty: 'No products available right now.',
    productNoDescription: 'No description.',
    newsNoImage: 'No cover image',
    newsEmpty: 'No news available right now.',
    storyEyebrow: 'About us',
    storyTitle: 'A foundry that connects tradition with modern production.',
    storyLead: 'Kopex MIN-LIV A.D. in Niš is an industrial iron and steel foundry covering development, production, and quality control of metal castings.',
    storyBody: 'Privatized in 2010 and operating in private ownership since 2020, with a focus on reliable delivery times and stable quality.',
    storyHighlights: ['start of production', 'current monthly capacity', 'planned capacity'],
    storyLink: 'More about us',
    storyImageAlt1: 'Kopex MIN-LIV facility',
    storyImageAlt2: 'Foundry complex',
    equipmentEyebrow: 'Equipment',
    equipmentTitle: 'Capacity and equipment for demanding industrial series.',
    equipmentLead: 'Modern equipment and processes ensure stable quality and reliable delivery timelines.',
    equipmentImageAlt1: 'Foundry production',
    equipmentImageAlt2: 'Casting process',
    equipmentImageAlt3: 'Process control',
    equipmentImageAlt4: 'Metal machining',
    equipmentCard1Title: 'Induction furnaces',
    equipmentCard1Body: 'Capacity 2.5 t, with melt casting up to 3 t (ductile and steel) and 6 t (gray iron).',
    equipmentCard2Title: 'Sand preparation',
    equipmentCard2Body: 'Bentonite mixture, furan resins and esters, Alfaset process, and sand reclamation.',
    equipmentCard3Title: 'Heat treatment',
    equipmentCard3Body: 'Furnaces 10 t (2100x1400x3500) and quench tanks 4000x3000x4000.',
    equipmentCard4Title: 'Quality control',
    equipmentCard4Body: 'Instruments for chemical and mechanical testing, ultrasound, and magnetic flux.',
    equipmentLink: 'Equipment details',
    qualityEyebrow: 'Laboratory and quality',
    qualityTitle: 'Full quality control from raw material to delivery.',
    qualityLead: 'A certified laboratory provides chemical and mechanical testing of metals, as well as dimensional and structural control.',
    qualityBullet1: 'Spectrometer, microscope, Brinell tester, Charpy pendulum, and tensile tester.',
    qualityBullet2: 'Ultrasound and magnetic flux for detecting internal irregularities.',
    qualityBullet3: 'Reports and documentation in line with customer requirements.',
    qualityLink: 'Laboratory details',
    qualityImageAlt: 'Laboratory and quality control',
    clientsEyebrow: 'Clients',
    clientsTitle: 'A reliable supplier of metal castings in the region and Europe.',
    clientsLead: 'We build partnerships on stable quality, delivery timelines, and transparent communication.',
    clientsDomesticTitle: 'Domestic clients',
    clientsDomesticList: 'EPS Serbia (Kolubara, Kostolac, TPP Obrenovac), D-Company Babušnica, Lafarge Serbia (Beočin), HBIS (Smederevo Steel Plant), ZI JIN (RTB) Bor, Titan Serbia (Kosjerić), Wolong Bor, Metalfer Steel Plant, and others.',
    clientsForeignTitle: 'International clients',
    clientsForeignList: 'LKR and Litostroj (Slovenia), Modelform (Poland), Danieli (Austria), Đuro Đaković, CIAK (Croatia), Alumina (Bosnia and Herzegovina), Arbal, Bulqizë (Albania), TPP Bitolj, MZT Pumps, May Komerc (North Macedonia), Ganz, Jász plasztic (Hungary), KEK (Kosovo), MAK Kotanidis (Greece).',
    certsEyebrow: 'Certificates',
    certsTitle: 'Quality system confirmed by certificates and standards.',
    certsLead: 'We continuously align processes with industry and customer requirements.',
    certsDownload: 'Download laboratory certificate PDF',
    certAlt9001: 'ISO 9001 certificate',
    certAlt14001: 'ISO 14001 certificate',
    certAlt45001: 'ISO 45001 certificate',
    ctaTitle: 'Request a quote and manufacturing of metal parts',
    ctaLead: 'Send specifications and drawings, and our team responds promptly.',
    ctaButton: 'Contact us'
  },
  de: {
    heroEyebrow: 'Niš • Industriegießerei • Seit 1884',
    heroTitle: 'Industriegießerei für Eisen- und Stahlguss, der lange hält.',
    heroLead:
      'Von Prototypen bis zur Serienfertigung: Grauguss, Sphäroguss und Stahlguss, mit spanender Bearbeitung, Wärmebehandlung und vollständiger Qualitätskontrolle.',
    heroCtaPrimary: 'Anfrage senden',
    heroCtaSecondary: 'Kapazitäten ansehen',
    heroTrust:
      'Partner aus Energie, Bergbau und Industrie: EPS, ZI JIN, Danieli, Lafarge, HBIS und weitere.',
    productsEyebrow: 'Produkte',
    productsTitle: 'Metallguss für Energie, Bergbau und Industrie.',
    productsLead:
      'Spezialisiert auf Grauguss, Sphäroguss und Stahlguss, einschließlich legierter Stähle für anspruchsvolle Einsatzbedingungen.',
    productsCta: 'Alle Produkte',
    newsEyebrow: 'News / Karriere',
    newsTitle: 'Aktuelle Nachrichten und Stellenangebote von Kopex MIN-LIV.',
    newsLead: 'Folgen Sie den neuesten Meldungen, Projekten und Einstellungsanzeigen unserer Gießerei.',
    newsCta: 'Alle News / Karriere',
    servicesEyebrow: 'Leistungen',
    servicesTitle: 'Kompletter Produktionszyklus an einem Ort.',
    servicesLead: 'Von Modellbau und Gießen bis zur Endbearbeitung, Dokumentation und Lieferung.',
    service01Title: 'Formenbau und Gießen',
    service01Body:
      'Herstellung von Gussteilen nach Kundenzeichnungen und Standards, mit FLEXIBILITÄT FÜR KLEINSERIEN UND EINZELFERTIGUNG.',
    service02Title: 'Mechanische Bearbeitung',
    service02Body:
      'Bearbeitung auf Standardmaschinen (Fräse, Drehmaschine, Bohrwerk) sowie CNC-Maschinen.',
    service03Title: 'Wärmebehandlung',
    service03Body:
      'Wärmebehandlung der Gussteile durch Abschrecken, Härten, Anlassen und Glühen in Großbecken mit Quench-Emulsion oder Wasser für optimale chemische und mechanische Eigenschaften.',
    service04Title: 'Endbearbeitung',
    service04Body:
      'Produktfinalisierung durch Schleifen, Lackieren, Schweißen und Strahlen (Sandstrahlen) für eine bessere Oberfläche und ansprechendes Erscheinungsbild.',
    service05Title: 'Qualitätskontrolle',
    service05Body:
      'Zertifiziertes Labor für chemische und mechanische Prüfungen mit Spektrometer, Charpy-Pendel und Zugprüfmaschine einschließlich Magnetfluss- und Ultraschallprüfungen.'
    heroStats: ['Jahre Tradition', 'geplante Monatskapazität', 'Schmelzkapazität pro Ofen'],
    productNoImage: 'Kein Bild',
    productView: 'Produkt ansehen',
    productEmpty: 'Derzeit sind keine Produkte verfügbar.',
    productNoDescription: 'Keine Beschreibung.',
    newsNoImage: 'Kein Titelbild',
    newsEmpty: 'Derzeit gibt es keine News.',
    storyEyebrow: 'Über uns',
    storyTitle: 'Eine Gießerei, die Tradition mit moderner Produktion verbindet.',
    storyLead: 'Kopex MIN-LIV A.D. in Niš ist eine industrielle Eisen- und Stahlgießerei mit Entwicklung, Produktion und Qualitätskontrolle von Metallgussteilen.',
    storyBody: '2010 privatisiert und seit 2020 in privatem Besitz, mit Fokus auf zuverlässige Liefertermine und stabile Qualität.',
    storyHighlights: ['Produktionsbeginn', 'aktuelle Monatskapazität', 'geplante Kapazität'],
    storyLink: 'Mehr über uns',
    storyImageAlt1: 'Kopex MIN-LIV Werk',
    storyImageAlt2: 'Gießereikomplex',
    equipmentEyebrow: 'Ausstattung',
    equipmentTitle: 'Kapazität und Ausstattung für anspruchsvolle Industriefertigung.',
    equipmentLead: 'Moderne Anlagen und Prozesse sichern stabile Qualität und zuverlässige Liefertermine.',
    equipmentImageAlt1: 'Gießereiproduktion',
    equipmentImageAlt2: 'Gießprozess',
    equipmentImageAlt3: 'Prozesskontrolle',
    equipmentImageAlt4: 'Metallbearbeitung',
    equipmentCard1Title: 'Induktionsöfen',
    equipmentCard1Body: 'Kapazität 2,5 t, mit Guss bis 3 t (Sphäro- und Stahlguss) und 6 t (Grauguss).',
    equipmentCard2Title: 'Sandaufbereitung',
    equipmentCard2Body: 'Bentonitmischung, Furanharze und Ester, Alfaset-Verfahren sowie Sandregeneration.',
    equipmentCard3Title: 'Wärmebehandlung',
    equipmentCard3Body: 'Ofen 10 t (2100x1400x3500) und Abschreckbecken 4000x3000x4000.',
    equipmentCard4Title: 'Qualitätskontrolle',
    equipmentCard4Body: 'Instrumente für chemische und mechanische Prüfungen, Ultraschall und Magnetfluss.',
    equipmentLink: 'Ausstattung im Detail',
    qualityEyebrow: 'Labor und Qualität',
    qualityTitle: 'Vollständige Qualitätskontrolle vom Rohmaterial bis zur Lieferung.',
    qualityLead: 'Ein zertifiziertes Labor ermöglicht chemische und mechanische Prüfungen sowie die Kontrolle von Maßen und Struktur.',
    qualityBullet1: 'Spektrometer, Mikroskop, Brinell, Charpy-Pendel und Zugprüfmaschine.',
    qualityBullet2: 'Ultraschall und Magnetfluss zur Detektion innerer Unregelmäßigkeiten.',
    qualityBullet3: 'Berichte und Dokumentation gemäß Kundenanforderungen.',
    qualityLink: 'Labordetails',
    qualityImageAlt: 'Labor und Qualitätskontrolle',
    clientsEyebrow: 'Kunden',
    clientsTitle: 'Zuverlässiger Lieferant von Metallgussteilen in der Region und Europa.',
    clientsLead: 'Partnerschaften basieren auf stabiler Qualität, Termintreue und transparenter Kommunikation.',
    clientsDomesticTitle: 'Inländische Kunden',
    clientsDomesticList: 'EPS Serbien (Kolubara, Kostolac, TPP Obrenovac), D-Company Babušnica, Lafarge Serbien (Beočin), HBIS (Stahlwerk Smederevo), ZI JIN (RTB) Bor, Titan Serbien (Kosjerić), Wolong Bor, Metalfer Stahlwerk und weitere.',
    clientsForeignTitle: 'Ausländische Kunden',
    clientsForeignList: 'LKR und Litostroj (Slowenien), Modelform (Polen), Danieli (Österreich), Đuro Đaković, CIAK (Kroatien), Alumina (Bosnien und Herzegowina), Arbal, Bulqizë (Albanien), TPP Bitolj, MZT Pumpe, May Komerc (Nordmazedonien), Ganz, Jász plasztic (Ungarn), KEK (Kosovo), MAK Kotanidis (Griechenland).',
    certsEyebrow: 'Zertifikate',
    certsTitle: 'Qualitätssystem durch Zertifikate und Standards bestätigt.',
    certsLead: 'Wir stimmen unsere Prozesse kontinuierlich mit Branchen- und Kundenanforderungen ab.',
    certsDownload: 'Laborzertifikat als PDF herunterladen',
    certAlt9001: 'ISO 9001 Zertifikat',
    certAlt14001: 'ISO 14001 Zertifikat',
    certAlt45001: 'ISO 45001 Zertifikat',
    ctaTitle: 'Anfrage für Angebot und Fertigung von Metallteilen',
    ctaLead: 'Senden Sie Spezifikationen und Zeichnungen, unser Team antwortet schnell.',
    ctaButton: 'Kontaktieren Sie uns'
  }
};

const getSnippet = (value: string, limit: number, fallback: string): string => {
  const block = value
    .split(/\n+/)
    .map((item) => item.trim())
    .find(Boolean);
  const preview = (block || value).replace(/\s+/g, ' ').trim();
  if (!preview) {
    return fallback;
  }
  if (preview.length <= limit) {
    return preview;
  }
  return `${preview.slice(0, limit)}...`;
};

const formatDate = (value: string, language: Language): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(getLanguageLocale(language), {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const getProductSnippet = (product: ProductItem, fallback: string): string =>
  getSnippet(product.summary || product.description || '', 150, fallback);

export default async function HomePage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = HOME_COPY[language];
  let products: ProductItem[] = [];
  let news: NewsItem[] = [];

  try {
    products = await getProductsList();
  } catch (error) {
    console.error('Home products error:', error);
  }

  try {
    news = await getNewsList();
  } catch (error) {
    console.error('Home news error:', error);
  }

  const latestNews = news.slice(0, 3);

  return (
    <div className="kopex-landing">
      <section className="kopex-hero">
        <div className="kopex-hero__media" aria-hidden="true">
          <HeroVideo />
        </div>
        <div className="stg-container kopex-hero__content">
          <p className="kopex-hero__eyebrow">{copy.heroEyebrow}</p>
          <h1 className="kopex-hero__title">
            {copy.heroTitle}
          </h1>
          <p className="kopex-hero__lead">
            {copy.heroLead}
          </p>
          <div className="kopex-hero__actions">
            <Link href="/contacts" className="kopex-button kopex-button--primary">{copy.heroCtaPrimary}</Link>
            <Link href="/services" className="kopex-button kopex-button--ghost">{copy.heroCtaSecondary}</Link>
          </div>
          <div className="kopex-hero__stats">
            <div className="kopex-stat">
              <span className="kopex-stat__value">140+</span>
              <span className="kopex-stat__label">{copy.heroStats[0]}</span>
            </div>
            <div className="kopex-stat">
              <span className="kopex-stat__value">1000 t</span>
              <span className="kopex-stat__label">{copy.heroStats[1]}</span>
            </div>
            <div className="kopex-stat">
              <span className="kopex-stat__value">2,5&#8211;6 t</span>
              <span className="kopex-stat__label">{copy.heroStats[2]}</span>
            </div>
          </div>
          <p className="kopex-hero__trust">
            {copy.heroTrust}
          </p>
        </div>
      </section>

      <section id="proizvodi" className="kopex-section kopex-section--products">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.productsEyebrow}</span>
            <h2>{copy.productsTitle}</h2>
            <p>
              {copy.productsLead}
            </p>
          </div>
          {products.length ? (
            <div className="kopex-product-grid">
              {products.map((product) => {
                const cover = product.heroImage || product.gallery[0] || '';
                return (
                  <article className="kopex-product-card" key={product.id}>
                    {cover ? (
                      <Image src={cover} alt={product.name} width={960} height={720} sizes={CARD_SIZES} />
                    ) : (
                      <div className="kopex-product-card__placeholder">{copy.productNoImage}</div>
                    )}
                    <div className="kopex-product-card__body">
                      <h3>{product.name}</h3>
                      <p>{getProductSnippet(product, copy.productNoDescription)}</p>
                      <div className="kopex-product-card__cta">
                        <Link href={`/products/${product.slug}`} className="kopex-link">
                          {copy.productView}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="kopex-product-card__placeholder">{copy.productEmpty}</div>
          )}
          <div className="kopex-products-actions">
            <Link href="/products" className="kopex-button kopex-button--primary">
              {copy.productsCta}
            </Link>
          </div>
        </div>
      </section>

      <section id="vesti" className="kopex-section kopex-section--news">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.newsEyebrow}</span>
            <h2>{copy.newsTitle}</h2>
            <p>
              {copy.newsLead}
            </p>
          </div>
          {latestNews.length ? (
            <div className="kopex-news-grid">
              {latestNews.map((item) => {
                const [cover] = item.images;
                return (
                  <article className="kopex-news-card" key={item.id}>
                    {cover ? (
                      <Image src={cover} alt={item.title} width={960} height={720} sizes={CARD_SIZES} />
                    ) : (
                      <div className="kopex-news-card__placeholder">{copy.newsNoImage}</div>
                    )}
                    <div className="kopex-news-card__body">
                      <span className="kopex-news-card__meta">{formatDate(item.createdAt, language)}</span>
                      <h3>{item.title}</h3>
                      <p>{getSnippet(item.body, 180, copy.productNoDescription)}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="kopex-news-card__placeholder">{copy.newsEmpty}</div>
          )}
          <div className="kopex-news-actions">
            <Link href="/news" className="kopex-button kopex-button--primary">
              {copy.newsCta}
            </Link>
          </div>
        </div>
      </section>

      <section id="o-nama" className="kopex-section kopex-section--story">
        <div className="stg-container kopex-split">
          <div className="kopex-split__content">
            <span className="kopex-eyebrow">{copy.storyEyebrow}</span>
            <h2>{copy.storyTitle}</h2>
            <p className="kopex-section__lead">
              {copy.storyLead}
            </p>
            <p>
              {copy.storyBody}
            </p>
            <div className="kopex-highlight-grid">
              <div className="kopex-highlight">
                <span className="kopex-highlight__value">1884</span>
                <span className="kopex-highlight__label">{copy.storyHighlights[0]}</span>
              </div>
              <div className="kopex-highlight">
                <span className="kopex-highlight__value">100 t</span>
                <span className="kopex-highlight__label">{copy.storyHighlights[1]}</span>
              </div>
              <div className="kopex-highlight">
                <span className="kopex-highlight__value">1000 t</span>
                <span className="kopex-highlight__label">{copy.storyHighlights[2]}</span>
              </div>
            </div>
            <Link href="/about-us" className="kopex-link">{copy.storyLink}</Link>
          </div>
          <div className="kopex-split__media">
            <div className="kopex-media-frame">
              <Image
                src="/img/kopex/facility-front.jpg"
                alt={copy.storyImageAlt1}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
            <div className="kopex-media-frame kopex-media-frame--offset">
              <Image
                src="/img/kopex/facility-yard.jpg"
                alt={copy.storyImageAlt2}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="kopex-section kopex-section--services">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.servicesEyebrow}</span>
            <h2>{copy.servicesTitle}</h2>
            <p>
              {copy.servicesLead}
            </p>
          </div>
          <div className="kopex-feature-grid">
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">01</span>
              <h3>{copy.service01Title}</h3>
              <p>
                {copy.service01Body}
              </p>
            </article>
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">02</span>
              <h3>{copy.service02Title}</h3>
              <p>
                {copy.service02Body}
              </p>
            </article>
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">03</span>
              <h3>{copy.service03Title}</h3>
              <p>
                {copy.service03Body}
              </p>
            </article>
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">04</span>
              <h3>{copy.service04Title}</h3>
              <p>
                {copy.service04Body}
              </p>
            </article>
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">05</span>
              <h3>{copy.service05Title}</h3>
              <p>
                {copy.service05Body}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="opremljenost" className="kopex-section kopex-section--equipment">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.equipmentEyebrow}</span>
            <h2>{copy.equipmentTitle}</h2>
            <p>
              {copy.equipmentLead}
            </p>
          </div>
          <div className="kopex-split">
            <div className="kopex-media-grid">
              <div className="kopex-media-grid__item kopex-media-grid__item--large">
                <Image
                  src="/img/kopex/production-01.jpg"
                  alt={copy.equipmentImageAlt1}
                  width={640}
                  height={520}
                  sizes={MEDIA_LARGE_SIZES}
                />
              </div>
              <div className="kopex-media-grid__item kopex-media-grid__item--tall">
                <Image
                  src="/img/kopex/production-02.jpg"
                  alt={copy.equipmentImageAlt2}
                  width={520}
                  height={820}
                  sizes={MEDIA_SMALL_SIZES}
                />
              </div>
              <div className="kopex-media-grid__item kopex-media-grid__item--wide">
                <Image
                  src="/img/kopex/production-03.jpg"
                  alt={copy.equipmentImageAlt3}
                  width={740}
                  height={520}
                  sizes={MEDIA_LARGE_SIZES}
                />
              </div>
              <div className="kopex-media-grid__item">
                <Image
                  src="/img/kopex/production-04.jpg"
                  alt={copy.equipmentImageAlt4}
                  width={520}
                  height={520}
                  sizes={MEDIA_SMALL_SIZES}
                />
              </div>
            </div>
            <div className="kopex-equipment-list">
              <div className="kopex-equipment-card">
                <h4>{copy.equipmentCard1Title}</h4>
                <p>{copy.equipmentCard1Body}</p>
              </div>
              <div className="kopex-equipment-card">
                <h4>{copy.equipmentCard2Title}</h4>
                <p>{copy.equipmentCard2Body}</p>
              </div>
              <div className="kopex-equipment-card">
                <h4>{copy.equipmentCard3Title}</h4>
                <p>{copy.equipmentCard3Body}</p>
              </div>
              <div className="kopex-equipment-card">
                <h4>{copy.equipmentCard4Title}</h4>
                <p>{copy.equipmentCard4Body}</p>
              </div>
              <Link href="/services" className="kopex-link">{copy.equipmentLink}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="kopex-section kopex-section--quality">
        <div className="stg-container kopex-split">
          <div className="kopex-split__content">
            <span className="kopex-eyebrow">{copy.qualityEyebrow}</span>
            <h2>{copy.qualityTitle}</h2>
            <p className="kopex-section__lead">
              {copy.qualityLead}
            </p>
            <ul className="kopex-quality-list">
              <li>{copy.qualityBullet1}</li>
              <li>{copy.qualityBullet2}</li>
              <li>{copy.qualityBullet3}</li>
            </ul>
            <Link href="/services#laboratorija" className="kopex-link">{copy.qualityLink}</Link>
          </div>
          <div className="kopex-split__media">
            <div className="kopex-media-frame">
              <Image
                src="/img/kopex/slides/page-05.jpg"
                alt={copy.qualityImageAlt}
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="kupci" className="kopex-section kopex-section--clients">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.clientsEyebrow}</span>
            <h2>{copy.clientsTitle}</h2>
            <p>{copy.clientsLead}</p>
          </div>
          <div className="kopex-client-grid">
            <div className="kopex-client-card">
              <h4>{copy.clientsDomesticTitle}</h4>
              <p>{copy.clientsDomesticList}</p>
            </div>
            <div className="kopex-client-card">
              <h4>{copy.clientsForeignTitle}</h4>
              <p>{copy.clientsForeignList}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sertifikati" className="kopex-section kopex-section--certs">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">{copy.certsEyebrow}</span>
            <h2>{copy.certsTitle}</h2>
            <p>{copy.certsLead}</p>
          </div>
          <div className="kopex-cert-grid">
            {[
              { src: '/img/kopex/certs/iso-9001.jpg', alt: copy.certAlt9001 },
              { src: '/img/kopex/certs/iso-14001.jpg', alt: copy.certAlt14001 },
              { src: '/img/kopex/certs/iso-45001.jpg', alt: copy.certAlt45001 }
            ].map((cert) => (
              <div className="kopex-cert-card" key={cert.src}>
                <Image src={cert.src} alt={cert.alt} width={2252} height={4000} sizes={CERT_SIZES} />
              </div>
            ))}
          </div>
          <div className="kopex-cert-actions">
            <a
              className="kopex-button kopex-button--primary"
              href="/docs/laboratory-certificate.pdf"
              download
            >
              {copy.certsDownload}
            </a>
          </div>
        </div>
      </section>

      <section className="kopex-section kopex-section--cta">
        <div className="stg-container">
          <div className="kopex-cta">
            <div>
              <h2>{copy.ctaTitle}</h2>
              <p className="kopex-section__lead">
                {copy.ctaLead}
              </p>
            </div>
            <div className="kopex-cta__actions">
              <Link href="/contacts" className="kopex-button kopex-button--primary">{copy.ctaButton}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
