import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import HeroVideo from '@/components/HeroVideo';
import { getNewsList } from '@/lib/news';
import { getProductsList } from '@/lib/products';
import type { NewsItem } from '@/lib/news';
import type { ProductItem } from '@/lib/products';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

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

const CERT_ITEMS = [
  { src: '/img/kopex/certs/iso-9001.jpg', alt: 'ISO 9001 sertifikat' },
  { src: '/img/kopex/certs/iso-14001.jpg', alt: 'ISO 14001 sertifikat' },
  { src: '/img/kopex/certs/iso-45001.jpg', alt: 'ISO 45001 sertifikat' }
];

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
      'Sertifikovana laboratorija za hemijska i mehanička ispitivanja odlivaka sa kvantometrom, Sarpijevim klatnom i kidalicom, uključujući ispitivanja magnetnim fluksom i ultrazvukom.'
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
      'Certified laboratory for chemical and mechanical testing of castings with spectrometer, Charpy pendulum, and tensile tester, including magnetic flux and ultrasonic testing.'
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
  }
};

const getSnippet = (value: string, limit = 160): string => {
  const block = value
    .split(/\n+/)
    .map((item) => item.trim())
    .find(Boolean);
  const preview = (block || value).replace(/\s+/g, ' ').trim();
  if (!preview) {
    return 'Bez opisa.';
  }
  if (preview.length <= limit) {
    return preview;
  }
  return `${preview.slice(0, limit)}...`;
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('sr-RS', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const getProductSnippet = (product: ProductItem): string =>
  getSnippet(product.summary || product.description || '', 150);

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
              <span className="kopex-stat__label">godina tradicije</span>
            </div>
            <div className="kopex-stat">
              <span className="kopex-stat__value">1000 t</span>
              <span className="kopex-stat__label">projektovani kapacitet mese&#269;no</span>
            </div>
            <div className="kopex-stat">
              <span className="kopex-stat__value">2,5&#8211;6 t</span>
              <span className="kopex-stat__label">kapacitet liva po pe&#263;i</span>
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
                      <div className="kopex-product-card__placeholder">Bez slike</div>
                    )}
                    <div className="kopex-product-card__body">
                      <h3>{product.name}</h3>
                      <p>{getProductSnippet(product)}</p>
                      <div className="kopex-product-card__cta">
                        <Link href={`/products/${product.slug}`} className="kopex-link">
                          Pogledaj proizvod
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="kopex-product-card__placeholder">Trenutno nema proizvoda.</div>
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
                      <div className="kopex-news-card__placeholder">Bez naslovne slike</div>
                    )}
                    <div className="kopex-news-card__body">
                      <span className="kopex-news-card__meta">{formatDate(item.createdAt)}</span>
                      <h3>{item.title}</h3>
                      <p>{getSnippet(item.body, 180)}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="kopex-news-card__placeholder">Trenutno nema vesti.</div>
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
            <span className="kopex-eyebrow">O nama</span>
            <h2>Livnica koja spaja tradiciju sa modernom proizvodnjom.</h2>
            <p className="kopex-section__lead">
              Kopex MIN-LIV A.D. u Ni&#353;u je industrijska livnica gvo&#382;&#273;a i &#269;elika koja obuhvata
              razvoj, proizvodnju i kontrolu kvaliteta metalnih odlivaka.
            </p>
            <p>
              Privatizovana je 2010. godine i posluje u privatnom vlasni&#353;tvu od 2020. godine, sa fokusom
              na pouzdane rokove isporuke i stabilan kvalitet.
            </p>
            <div className="kopex-highlight-grid">
              <div className="kopex-highlight">
                <span className="kopex-highlight__value">1884</span>
                <span className="kopex-highlight__label">po&#269;etak proizvodnje</span>
              </div>
              <div className="kopex-highlight">
                <span className="kopex-highlight__value">100 t</span>
                <span className="kopex-highlight__label">trenutni kapacitet mese&#269;no</span>
              </div>
              <div className="kopex-highlight">
                <span className="kopex-highlight__value">1000 t</span>
                <span className="kopex-highlight__label">projektovani kapacitet</span>
              </div>
            </div>
            <Link href="/about-us" className="kopex-link">Vi&#353;e o nama</Link>
          </div>
          <div className="kopex-split__media">
            <div className="kopex-media-frame">
              <Image
                src="/img/kopex/facility-front.jpg"
                alt="Kopex MIN-LIV pogon"
                width={960}
                height={720}
                sizes={HALF_SIZES}
              />
            </div>
            <div className="kopex-media-frame kopex-media-frame--offset">
              <Image
                src="/img/kopex/facility-yard.jpg"
                alt="Kompleks livnice"
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
            <span className="kopex-eyebrow">Opremljenost</span>
            <h2>Kapacitet i oprema za zahtevne industrijske serije.</h2>
            <p>
              Savremena oprema i procesi omogu&#263;avaju stabilan kvalitet i pouzdane rokove isporuke.
            </p>
          </div>
          <div className="kopex-split">
            <div className="kopex-media-grid">
              <div className="kopex-media-grid__item kopex-media-grid__item--large">
                <Image
                  src="/img/kopex/production-01.jpg"
                  alt="Livni&#269;ka proizvodnja"
                  width={640}
                  height={520}
                  sizes={MEDIA_LARGE_SIZES}
                />
              </div>
              <div className="kopex-media-grid__item kopex-media-grid__item--tall">
                <Image
                  src="/img/kopex/production-02.jpg"
                  alt="Proces livenja"
                  width={520}
                  height={820}
                  sizes={MEDIA_SMALL_SIZES}
                />
              </div>
              <div className="kopex-media-grid__item kopex-media-grid__item--wide">
                <Image
                  src="/img/kopex/production-03.jpg"
                  alt="Kontrola procesa"
                  width={740}
                  height={520}
                  sizes={MEDIA_LARGE_SIZES}
                />
              </div>
              <div className="kopex-media-grid__item">
                <Image
                  src="/img/kopex/production-04.jpg"
                  alt="Ma&#353;inska obrada metala"
                  width={520}
                  height={520}
                  sizes={MEDIA_SMALL_SIZES}
                />
              </div>
            </div>
            <div className="kopex-equipment-list">
              <div className="kopex-equipment-card">
                <h4>Indukcione pe&#263;i</h4>
                <p>Kapacitet 2,5 t, uz mogu&#263;nost liva do 3 t (nodularni i &#269;eli&#269;ni) i 6 t (sivi liv).</p>
              </div>
              <div className="kopex-equipment-card">
                <h4>Priprema peska</h4>
                <p>Bentonitna me&#353;avina, furanske smole i estre, Alfaset postupak i regeneracija peska.</p>
              </div>
              <div className="kopex-equipment-card">
                <h4>Termi&#269;ka obrada</h4>
                <p>Pe&#263;i 10 t (2100x1400x3500) i bazeni za ga&#353;enje/kaljenje 4000x3000x4000.</p>
              </div>
              <div className="kopex-equipment-card">
                <h4>Kontrola kvaliteta</h4>
                <p>Instrumenti za hemijska i mehani&#269;ka ispitivanja, ultrazvuk i magnetni fluks.</p>
              </div>
              <Link href="/services" className="kopex-link">Detalji opremljenosti</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="kopex-section kopex-section--quality">
        <div className="stg-container kopex-split">
          <div className="kopex-split__content">
            <span className="kopex-eyebrow">Laboratorija i kvalitet</span>
            <h2>Potpuna kontrola kvaliteta od sirovine do isporuke.</h2>
            <p className="kopex-section__lead">
              Sertifikovana laboratorija obezbe&#273;uje hemijska i mehani&#269;ka ispitivanja metala, kao i
              kontrolu dimenzija i strukture.
            </p>
            <ul className="kopex-quality-list">
              <li>Kvantometar, mikroskop, brinel, Sarpijevo klatno i kidalica.</li>
              <li>Ultrazvuk i magnetni fluks za detekciju unutra&#353;njih nepravilnosti.</li>
              <li>Izve&#353;taji i dokumentacija u skladu sa zahtevima kupca.</li>
            </ul>
            <Link href="/services#laboratorija" className="kopex-link">Detalji laboratorije</Link>
          </div>
          <div className="kopex-split__media">
            <div className="kopex-media-frame">
              <Image
                src="/img/kopex/slides/page-05.jpg"
                alt="Laboratorija i kontrola kvaliteta"
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
            <span className="kopex-eyebrow">Kupci</span>
            <h2>Pouzdan dobavlja&#269; metalnih odlivaka u regionu i Evropi.</h2>
            <p>Partnerstva gradimo na stabilnom kvalitetu, rokovima i transparentnoj komunikaciji.</p>
          </div>
          <div className="kopex-client-grid">
            <div className="kopex-client-card">
              <h4>Doma&#263;i kupci</h4>
              <p>EPS Srbija (Kolubara, Kostolac, TE Obrenovac), D-Company Babu&#353;nica, Lafarge Srbija (Beo&#269;in), HBIS (&#381;elezara Smederevo), ZI JIN (RTB) Bor, Titan Srbija (Kosjeri&#263;), Wolong Bor, Metalfer &#382;elezara i drugi.</p>
            </div>
            <div className="kopex-client-card">
              <h4>Inostrani kupci</h4>
              <p>LKR i Litostroj (Slovenija), Modelform (Poljska), Danieli (Austrija), &#272;uro &#272;akovi&#263;, CIAK (Hrvatska), Alumina (BIH), Arbal, Bulqiz&#235; (Albanija), TE Bitolj, MZT Pumpe, May Komerc (Makedonija), Ganz, J&#225;sz plasztic (Ma&#273;arska), KEK (Kosovo), MAK Kotanidis (Gr&#269;ka).</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sertifikati" className="kopex-section kopex-section--certs">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">Sertifikati</span>
            <h2>Sistem kvaliteta potvr&#273;en sertifikatima i standardima.</h2>
            <p>Kontinuirano uskla&#273;ujemo procese sa zahtevima industrije i kupaca.</p>
          </div>
          <div className="kopex-cert-grid">
            {CERT_ITEMS.map((cert) => (
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
              Preuzmi PDF sertifikat laboratorije
            </a>
          </div>
        </div>
      </section>

      <section className="kopex-section kopex-section--cta">
        <div className="stg-container">
          <div className="kopex-cta">
            <div>
              <h2>Zahtev za ponudu i proizvodnju metalnih delova</h2>
              <p className="kopex-section__lead">
                Po&#353;aljite specifikacije i crte&#382;e, a na&#353; tim odgovara u najkra&#263;em roku.
              </p>
            </div>
            <div className="kopex-cta__actions">
              <Link href="/contacts" className="kopex-button kopex-button--primary">Kontaktirajte nas</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
