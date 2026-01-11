import type { Metadata } from 'next';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import { getNewsList } from '@/lib/news';
import { getProductsList } from '@/lib/products';
import type { NewsItem } from '@/lib/news';
import type { ProductItem } from '@/lib/products';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Industrijska livnica gvo\u017e\u0111a i \u010delika Ni\u0161',
  description:
    'Kopex MIN-LIV A.D. Ni\u0161 je industrijska livnica Srbije za livenje metala i proizvodnju metalnih odlivaka: sivi liv, nodularni liv i \u010deli\u010dni liv, uz mehani\u010dku obradu metala (machining), termi\u010dku obradu, sa\u010dmarenje/pe\u0161karenje i kontrolu kvaliteta.'
};

export const dynamic = 'force-dynamic';

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
          <p className="kopex-hero__eyebrow">Ni&#353; &#8226; Industrijska livnica &#8226; Od 1884</p>
          <h1 className="kopex-hero__title">
            Industrijska livnica gvo&#382;&#273;a i &#269;elika za odlivke koji traju.
          </h1>
          <p className="kopex-hero__lead">
            Od prototipa do serijske proizvodnje: sivi liv, nodularni liv i &#269;eli&#269;ni liv, uz ma&#353;insku
            obradu, termi&#269;ku obradu i potpunu kontrolu kvaliteta.
          </p>
          <div className="kopex-hero__actions">
            <Link href="/contacts" className="kopex-button kopex-button--primary">Po&#353;aljite upit</Link>
            <Link href="/services" className="kopex-button kopex-button--ghost">Pogledajte kapacitete</Link>
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
            Partneri iz energetike, rudarstva i industrije: EPS, ZI JIN, Danieli, Lafarge, HBIS i drugi.
          </p>
        </div>
      </section>

      <section id="proizvodi" className="kopex-section kopex-section--products">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">Proizvodi</span>
            <h2>Metalni odlivci za energetiku, rudarstvo i industriju.</h2>
            <p>
              Specijalizovani smo za sivi liv, nodularni liv i &#269;eli&#269;ni liv, uklju&#269;uju&#263;i legirane
              &#269;elike za zahtevne uslove rada.
            </p>
          </div>
          {products.length ? (
            <div className="kopex-product-grid">
              {products.map((product) => {
                const cover = product.heroImage || product.gallery[0] || '';
                return (
                  <article className="kopex-product-card" key={product.id}>
                    {cover ? (
                      <img src={cover} alt={product.name} width={960} height={720} />
                    ) : (
                      <div className="kopex-product-card__placeholder">Bez slike</div>
                    )}
                    <div className="kopex-product-card__body">
                      <h3>{product.name}</h3>
                      <p>{getProductSnippet(product)}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="kopex-product-card__placeholder">Trenutno nema proizvoda.</div>
          )}
        </div>
      </section>

      <section id="vesti" className="kopex-section kopex-section--news">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">Vesti</span>
            <h2>Najnovije informacije iz Kopex MIN-LIV.</h2>
            <p>
              Pratite najnovije objave, projekte i aktivnosti iz nase livnice.
            </p>
          </div>
          {latestNews.length ? (
            <div className="kopex-news-grid">
              {latestNews.map((item) => {
                const [cover] = item.images;
                return (
                  <article className="kopex-news-card" key={item.id}>
                    {cover ? (
                      <img src={cover} alt={item.title} width={960} height={720} />
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
              Sve vesti
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
              <img src="/img/kopex/facility-front.jpg" alt="Kopex MIN-LIV pogon" width={960} height={720} />
            </div>
            <div className="kopex-media-frame kopex-media-frame--offset">
              <img src="/img/kopex/facility-yard.jpg" alt="Kompleks livnice" width={960} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section className="kopex-section kopex-section--services">
        <div className="stg-container">
          <div className="kopex-section__header">
            <span className="kopex-eyebrow">Usluge</span>
            <h2>Kompletan proizvodni ciklus na jednom mestu.</h2>
            <p>
              Od modelovanja i livenja do zavr&#353;ne obrade, dokumentacije i isporuke.
            </p>
          </div>
          <div className="kopex-feature-grid">
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">01</span>
              <h3>Livenje i modelovanje</h3>
              <p>
                Izrada odliva po crte&#382;ima i standardima kupca, uz fleksibilnost pojedina&#269;ne i
                serijske proizvodnje.
              </p>
            </article>
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">02</span>
              <h3>Ma&#353;inska i termi&#269;ka obrada</h3>
              <p>
                Obrada na CNC opremi, ga&#353;enje i kaljenje, sa&#269;marenje i pe&#353;karenje radi
                optimalnih mehani&#269;kih svojstava.
              </p>
            </article>
            <article className="kopex-feature-card">
              <span className="kopex-feature-card__kicker">03</span>
              <h3>Kontrola kvaliteta</h3>
              <p>
                Sertifikovana laboratorija, merna oprema i kompletna dokumentacija garantuju stabilan
                kvalitet i pouzdanost isporuke.
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
                <img src="/img/kopex/production-01.jpg" alt="Livni&#269;ka proizvodnja" width={640} height={520} />
              </div>
              <div className="kopex-media-grid__item kopex-media-grid__item--tall">
                <img src="/img/kopex/production-02.jpg" alt="Proces livenja" width={520} height={820} />
              </div>
              <div className="kopex-media-grid__item kopex-media-grid__item--wide">
                <img src="/img/kopex/production-03.jpg" alt="Kontrola procesa" width={740} height={520} />
              </div>
              <div className="kopex-media-grid__item">
                <img src="/img/kopex/production-04.jpg" alt="Ma&#353;inska obrada metala" width={520} height={520} />
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
              <img src="/img/kopex/slides/page-05.jpg" alt="Laboratorija i kontrola kvaliteta" width={960} height={720} />
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
          <div className="kopex-cert-card">
            <img src="/img/kopex/slides/page-11.jpg" alt="Sertifikati kvaliteta KOPEX MIN-LIV" width={960} height={720} />
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
