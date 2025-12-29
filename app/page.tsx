import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Industrijska livnica gvo\u017e\u0111a i \u010delika Ni\u0161',
  description:
    'Kopex MIN-LIV A.D. Ni\u0161 je industrijska livnica Srbije za livenje metala i proizvodnju metalnih odlivaka: sivi liv, nodularni liv i \u010deli\u010dni liv, uz mehani\u010dku obradu metala (machining), termi\u010dku obradu, sa\u010dmarenje/pe\u0161karenje i kontrolu kvaliteta.'
};

export default function HomePage() {
  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row stg-large-gap stg-valign-middle">
          <div className="stg-col-6 stg-tp-col-12">
            <h1 className="bringer-page-title">KOPEX MIN-LIV A.D. &#8211; Industrijska livnica gvo&#382;&#273;a i &#269;elika u Ni&#353;u</h1>
            <p className="bringer-large-text">Industrijska livnica u Ni&#353;u sa tradicijom od 1884. godine. Specijalizovani smo za livenje metala u Srbiji i proizvodnju metalnih i industrijskih odlivaka od sivog, nodularnog i &#269;eli&#269;nog liva, uz mehani&#269;ku obradu metala (machining), termi&#269;ku obradu i strogu kontrolu kvaliteta.</p>
            <p>Adresa: Bulevar 12. februara 82, Ni&#353;, Srbija.</p>
            <div className="stg-top-gap">
              <Link href="/contacts" className="bringer-button">Po&#353;aljite upit</Link>
            </div>
          </div>
          <div className="stg-col-6 stg-tp-col-12">
            <div className="bringer-parallax-media">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/facility-front.jpg" alt="Kopex MIN-LIV pogon" width={960} height={640} />
            </div>
          </div>
        </div>
      </section>

      <section id="o-nama" className="divider-top">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>Livnica Ni&#353;: istorijat industrijske livnice</h2>
            <p className="bringer-large-text">Livnica &quot;KOPEX MIN-LIV A.D.&quot; u Ni&#353;u je industrijska livnica gvo&#382;&#273;a i &#269;elika sa korenima od 1884. godine. Kao livnica gvo&#382;&#273;a i livnica &#269;elika, razvijali smo proizvodnju metalnih delova za energetiku, rudarstvo i industriju; proizvodnja odlivaka po&#269;inje 1885. godine.</p>
            <p>Privatizovana je 2010. godine od strane poljske grupacije &quot;Kopex SA&quot;, u &#269;ijem sastavu ostaje do 2020. godine kada prelazi u privatno vlasni&#353;tvo.</p>
            <p>Za inostrane partnere, Kopex MIN-LIV posluje kao steel casting foundry / iron casting foundry (steel foundry Serbia).</p>
            <div className="align-right">
              <Link href="/about-us" className="bringer-arrow-link">Vi&#353;e o nama</Link>
            </div>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-grid-2cols">
              <div className="bringer-parallax-media">
                <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/facility-front.jpg" alt="Objekat livnice" width={960} height={720} />
              </div>
              <div className="bringer-parallax-media">
                <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/facility-yard.jpg" alt="Kompleks livnice" width={960} height={720} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="opremljenost" className="backlight-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Opremljenost za livenje metala i termi&#269;ku obradu</h2>
              <p className="bringer-large-text">Savremena oprema i procesi omogu&#263;avaju stabilan kvalitet, pouzdan rok isporuke i usluge kao &#353;to mehani&#269;ka obrada metala (machining), termi&#269;ka obrada i priprema metalnih povr&#353;ina (sa&#269;marenje, pe&#353;karenje).</p>
            </div>
          </div>
        </div>
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6 stg-tp-col-12">
            <ul className="bringer-detailed-list bringer-detailed-list--mobile-details">
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Indukcione pe&#263;i<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Kapacitet 2,5 t, uz mogu&#263;nost liva do 3 t (nodularni i &#269;eli&#269;ni), odnosno 6 t (sivi liv).</p>
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
                  <h4>Termi&#269;ka obrada<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>Pe&#263;i 10 t (2100x1400x3500) i bazeni za ga&#353;enje/kaljenje 4000x3000x4000.</p>
                </div>
              </li>
              <li>
                <div className="bringer-detailed-list-title">
                  <h4>Kapacitet proizvodnje<span className="bringer-accent">.</span></h4>
                </div>
                <div className="bringer-detailed-list-description">
                  <p>100 t mese&#269;no, projektovani kapacitet 1000 t mese&#269;no.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="stg-col-6 stg-tp-col-12 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-04.jpg" alt="Proizvodni pogon" width={960} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section id="proizvodi" className="backlight-bottom divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Metalni odlivci: sivi liv, nodularni liv i &#269;eli&#269;ni liv</h2>
              <p className="bringer-large-text">Proizvodnja metalnih odlivaka, uklju&#269;uju&#263;i odlivke od sivog liva, odlivke od nodularnog liva i &#269;eli&#269;ni liv, uz specijalizaciju za legirane (posebno manganske) &#269;elike.</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-06.jpg" alt="Sivi liv" width={960} height={720} />
              <h5>Sivi liv</h5>
              <p>Odlivci od sivog liva za industrijske sisteme, rudarsku i energetsku opremu.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-07.jpg" alt="Nodularni liv" width={960} height={720} />
              <h5>Nodularni liv</h5>
              <p>Odlivci od nodularnog liva (ductile iron casting) sa visokom &#269;vrsto&#263;om i otporno&#353;&#263;u.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-12">
            <div className="bringer-block">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-08.jpg" alt="Celicni liv" width={960} height={720} />
              <h5>&#268;eli&#269;ni liv</h5>
              <p>&#268;eli&#269;ni liv za zahtevne industrijske odlivke, uz velike bazene za ga&#353;enje i kaljenje.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="backlight-top">
        <div className="stg-row stg-large-gap stg-valign-middle stg-tp-column-reverse">
          <div className="stg-col-6">
            <h2>Livnica sa laboratorijom i kontrolom kvaliteta metala</h2>
            <p className="bringer-large-text">Sertifikovana laboratorija za hemijska ispitivanja metala, mehani&#269;ka ispitivanja metala i kontrolu kvaliteta metala.</p>
            <p>Kvantometar, mikroskop, brinel, Sarpijevo klatno, kidalica, ultrazvuk i magnetni fluks omogu&#263;avaju kompletnu kontrolu kvaliteta odlivaka.</p>
            <div className="align-right">
              <Link href="/services#laboratorija" className="bringer-arrow-link">Detalji laboratorije</Link>
            </div>
          </div>
          <div className="stg-col-6 stg-tp-bottom-gap-l">
            <div className="bringer-parallax-media">
              <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-05.jpg" alt="Laboratorija" width={960} height={720} />
            </div>
          </div>
        </div>
      </section>

      <section id="kupci" className="divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Dobavlja&#269; metalnih odlivaka za industriju</h2>
              <p className="bringer-large-text">Pouzdan dobavlja&#269; metalnih odlivaka za doma&#263;e i inostrane partnere iz energetike, rudarstva i industrije.</p>
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
        <div className="stg-top-gap-l">
          <div className="bringer-parallax-media">
            <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-09.jpg" alt="Kupci - referentni projekti" width={960} height={720} />
          </div>
        </div>
      </section>

      <section id="sertifikati" className="backlight-bottom divider-top">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Sertifikati kvaliteta livnice Srbije</h2>
              <p className="bringer-large-text">Sistem kvaliteta livnice u Srbiji potvr&#273;en sertifikatima i standardima proizvodnje.</p>
            </div>
          </div>
        </div>
        <div className="bringer-parallax-media">
          <img className="bringer-lazy" src="/img/null.png" data-src="/img/kopex/slides/page-11.jpg" alt="Sertifikati KOPEX MIN-LIV" width={960} height={720} />
        </div>
      </section>

      <section>
        <div className="align-center stg-bottom-gap-l">
          <h2>Zahtev za ponudu i proizvodnju metalnih delova</h2>
          <p className="bringer-large-text">Po&#353;aljite zahteve i specifikacije za metalne odlivke i proizvodnju metalnih delova; na&#353; tim je spreman da odgovori u najkra&#263;em roku.</p>
        </div>
        <div className="align-center">
          <Link href="/contacts" className="bringer-button">Kontaktirajte nas</Link>
        </div>
      </section>
    </div>
  );
}

