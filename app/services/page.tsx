import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Opremljenost',
  description: 'Tehnicka opremljenost i kapaciteti livnice KOPEX MIN-LIV A.D. Ni\u0161.'
};

const PARALLAX_SIZES = '(max-width: 739px) 100vw, (max-width: 1200px) 90vw, 50vw';

export default function ServicesPage() {
  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row">
          <div className="stg-col-8 stg-offset-2 align-center stg-tp-col-10 stg-tp-offset-1">
            <h1 className="bringer-page-title">Tehni&#269;ka opremljenost</h1>
            <p className="bringer-large-text">Kompletna tehnologija livenja, termi&#269;ke obrade i ma&#353;inske obrade.</p>
          </div>
        </div>
      </section>

      <section className="divider-bottom">
        <div className="stg-row stg-large-gap stg-valign-middle">
          <div className="stg-col-6 stg-tp-col-12">
            <ul className="bringer-detailed-list">
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Indukcione pe&#263;i<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Kapacitet 2,5 t, sa mogu&#263;no&#353;&#263;u liva do 3 t (nodularni i &#269;eli&#269;ni) i 6 t (sivi liv).</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Priprema peska<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Bentonitna me&#353;avina, furanske smole i estre; Alfaset postupak i regeneracija peska.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Mikseri i postupci<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Mikseri za sigelnu me&#353;avinu, &#352;ALKO postupak, CO2 i furanske smole.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Peskirnice<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Peskirnice metalnom sa&#269;mom dimenzija 2200x1900x2500.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Termi&#269;ka obrada<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Pe&#263;i 10 t (2100x1400x3500) i bazeni za ga&#353;enje/kaljenje 4000x3000x4000.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Ma&#353;inska obrada<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Glodalica, strug i CNC ma&#353;ine za preciznu obradu odlivaka.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/slides/page-04.jpg"
                alt="Opremljenost"
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
              <h2>Kapaciteti</h2>
              <p className="bringer-large-text">Stabilna proizvodnja i fleksibilnost za velike industrijske odlivke.</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block">
              <h4>100 t/mesec</h4>
              <p>Trenutni kapacitet proizvodnje (projektovano 1000 t/mesec).</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block">
              <h4>2,5 t</h4>
              <p>Kapacitet indukcionih pe&#263;i za stabilan proces livenja.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-12">
            <div className="bringer-block">
              <h4>3-6 t</h4>
              <p>Maksimalna te&#382;ina odlivaka: 3 t (nodularni/&#269;eli&#269;ni), 6 t (sivi liv).</p>
            </div>
          </div>
        </div>
      </section>

      <section id="laboratorija" className="backlight-bottom divider-top">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>Laboratorija</h2>
            <p className="bringer-large-text">Sertifikovana laboratorija za mehani&#269;ka i hemijska ispitivanja i kontrolu kvaliteta.</p>
            <p>Kvantometar, mikroskop, brinel, Sarpijevo klatno, kidalica, ultrazvuk i magnetni fluks.</p>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <Image
                src="/img/kopex/slides/page-05.jpg"
                alt="Laboratorija"
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

