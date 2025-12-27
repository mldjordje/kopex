import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | O nama',
  description: 'Istorijat i kapaciteti KOPEX MIN-LIV A.D. Ni\u0161, livnice sa tradicijom od 1884. godine.'
};

export default function AboutPage() {
  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row">
          <div className="stg-col-8 stg-offset-2 align-center stg-tp-col-10 stg-tp-offset-1">
            <h1 className="bringer-page-title">O nama</h1>
            <p className="bringer-large-text">Livnica KOPEX MIN-LIV A.D. Ni&#353; sa tradicijom du&#382;om od jednog veka.</p>
          </div>
        </div>
      </section>

      <section className="divider-bottom">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>Istorijat</h2>
            <ul className="bringer-detailed-list">
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>1884<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Osnivanje livnice u sastavu radionica za popravku &#382;elezni&#269;kih vozila.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>1885<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Po&#269;etak proizvodnje odlivaka u okviru tada&#353;njih &#382;elezni&#269;kih radionica.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>2010<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Privatizacija od strane poljske grupacije &quot;Kopex SA&quot;.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>2020<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Prelazak u privatno vlasni&#353;tvo i nastavak modernizacije.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/facility-front.jpg" alt="Kopex MIN-LIV istorijat" width={960} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-top">
        <div className="stg-row stg-large-gap stg-valign-middle">
          <div className="stg-col-6 stg-tp-col-12">
            <div className="bringer-parallax-media">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-04.jpg" alt="Tehnicka opremljenost" width={960} height={720} />
            </div>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h2>Kapaciteti i oprema</h2>
            <p className="bringer-large-text">Indukcione pe&#263;i kapaciteta 2,5 t, priprema peska za vi&#353;e tehnologija i savremena termi&#269;ka obrada.</p>
            <p>Kapacitet proizvodnje iznosi 100 t mese&#269;no (projektovano 1000 t mese&#269;no), uz mogu&#263;nost izrade odlivaka do 3 t (nodularni i &#269;eli&#269;ni liv) i do 6 t (sivi liv).</p>
            <p>Radionica za ma&#353;insku obradu obuhvata glodalicu, strug i CNC ma&#353;ine.</p>
            <div className="align-right">
              <Link href="/services" className="bringer-arrow-link">Detalji opreme</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-bottom divider-top" id="laboratorija">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>Laboratorija</h2>
            <p className="bringer-large-text">Sertifikovana laboratorija za mehani&#269;ka i hemijska ispitivanja i kontrolu kvaliteta.</p>
            <p>Oprema obuhvata kvantometar, mikroskop, brinel, Sarpijevo klatno, kidalicu, ultrazvuk i magnetni fluks.</p>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-05.jpg" alt="Laboratorija" width={960} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section className="divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Proizvodi</h2>
              <p className="bringer-large-text">Odlivci od sivog, nodularnog i &#269;eli&#269;nog liva, kao i legirani &#269;elici.</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-06.jpg" alt="Sivi liv" width={960} height={720} />
              <h5>Sivi liv</h5>
              <p>Stabilna serijska proizvodnja i pouzdan kvalitet.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-07.jpg" alt="Nodularni liv" width={960} height={720} />
              <h5>Nodularni liv</h5>
              <p>Visoke mehani&#269;ke osobine i dug vek trajanja.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-12">
            <div className="bringer-block">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-08.jpg" alt="Celicni liv" width={960} height={720} />
              <h5>&#268;eli&#269;ni liv</h5>
              <p>Specijalizacija za legirane i manganske &#269;elike.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-top divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Kupci</h2>
              <p className="bringer-large-text">Doma&#263;i i inostrani partneri iz industrije, energetike i rudarstva.</p>
            </div>
          </div>
        </div>
        <div className="stg-row stg-large-gap">
          <div className="stg-col-6 stg-tp-col-12">
            <h5>Doma&#263;i kupci</h5>
            <p>EPS Srbija (Kolubara, Kostolac, TE Obrenovac), D-Company Babu&#353;nica, Lafarge Srbija (Beo&#269;in), HBIS (&#381;elezara Smederevo), ZI JIN (RTB) Bor, Titan Srbija (Kosjeri&#263;), Wolong Bor, Metalfer &#382;elezara i drugi.</p>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <h5>Inostrani kupci</h5>
            <p>LKR i Litostroj (Slovenija), Modelform (Poljska), Danieli (Austrija), &#272;uro &#272;akovi&#263;, CIAK (Hrvatska), Alumina (BIH), Arbal, Bulqiz&#235; (Albanija), TE Bitolj, MZT Pumpe, May Komerc (Makedonija), Ganz, J&#225;sz plasztic (Ma&#273;arska), KEK (Kosovo), MAK Kotanidis (Gr&#269;ka).</p>
          </div>
        </div>
      </section>

      <section className="backlight-bottom divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Sertifikati</h2>
              <p className="bringer-large-text">Kvalitet potvr&#273;en sertifikatima i standardima proizvodnje.</p>
            </div>
          </div>
        </div>
        <div className="bringer-parallax-media">
          <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-11.jpg" alt="Sertifikati" width={960} height={720} />
        </div>
      </section>

      <section>
        <div className="align-center stg-bottom-gap-l">
          <h2>O&#269;ekujemo va&#353; upit!</h2>
          <p className="bringer-large-text">Po&#353;aljite zahteve i specifikacije, na&#353; tim je spreman da odgovori u najkra&#263;em roku.</p>
        </div>
        <div className="align-center">
          <Link href="/contacts" className="bringer-button">Kontaktirajte nas</Link>
        </div>
      </section>
    </div>
  );
}
