import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Kontakt',
  description: 'Kontaktirajte KOPEX MIN-LIV A.D. Ni\u0161 - Bulevar 12. februara 82, Ni\u0161.'
};

const FULL_SIZES = '(max-width: 739px) 100vw, 80vw';

export default function ContactsPage() {
  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row stg-bottom-gap-l">
          <div className="stg-col-8 stg-offset-2 align-center">
            <h1 className="bringer-page-title">Kontakt</h1>
            <p className="bringer-large-text">Kopex Min A.D. Ni&#353; je tu da odgovori na sva va&#353;a pitanja i pru&#382;i podr&#353;ku u vezi sa na&#353;im uslugama i proizvodima.</p>
          </div>
        </div>
        <div className="bringer-parallax-media" data-parallax-speed="20">
          <Image
            src="/img/kopex/facility-yard.jpg"
            alt="Kontakt"
            width={1920}
            height={960}
            sizes={FULL_SIZES}
          />
        </div>
      </section>

      <section className="backlight-top divider-bottom">
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Pove&#382;ite se sa nama</h2>
              <p className="bringer-large-text">Evo kako mo&#382;ete stupiti u kontakt sa timom Kopex Min.</p>
            </div>
          </div>
        </div>
        <div className="stg-row" data-stagger-appear="fade-up" data-delay="200" data-stagger-unload="fade-up">
          <div className="stg-col-4 stg-tp-col-6 stg-tp-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="tel:+38118245678" className="bringer-grid-item-link"></a>
              <div>
                <h5>Telefon<span className="bringer-accent">.</span></h5>
                <h6>+381 18 245 678</h6>
              </div>
              <p>Pozovite nas direktno i razgovarajte sa na&#353;im timom stru&#269;njaka.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-6 stg-tp-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="mailto:info@kopexmin.rs" className="bringer-grid-item-link"></a>
              <div>
                <h5>Email<span className="bringer-accent">.</span></h5>
                <h6>info@kopexmin.rs</h6>
              </div>
              <p>Po&#353;aljite nam detaljnu poruku. Odgovori&#263;emo u najkra&#263;em roku.</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-12">
            <div className="bringer-block stg-aspect-square stg-tp-aspect-rectangle stg-vertical-space-between">
              <div>
                <h5>Dru&#353;tvene mre&#382;e<span className="bringer-accent">.</span></h5>
                <ul className="bringer-socials-list stg-small-gap" data-stagger-appear="fade-up" data-stagger-delay="75">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="bringer-socials-facebook">
                      <i></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="bringer-socials-instagram">
                      <i></i>
                    </a>
                  </li>
                </ul>
              </div>
              <p>Pratite nas na dru&#353;tvenim mre&#382;ama i saznajte vi&#353;e o na&#353;im projektima i proizvodnji.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>Posetite na&#353;u fabriku</h2>
              <p className="bringer-large-text">Dogovorite obilazak i upoznajte na&#353; tim i proizvodne kapacitete.</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="https://www.google.com/maps/place/Kopex+MIN,+Bulevar+12.+februara,+Ni%C5%A1+18000" className="bringer-grid-item-link" target="_blank" rel="noreferrer"></a>
              <div>
                <h5>Adresa<span className="bringer-accent">.</span></h5>
                <h6>Bulevar 12. februara 82, Ni&#353; 18000</h6>
              </div>
              <p>Posetite na&#353;u fabriku i upoznajte se sa proizvodnim procesom.</p>
            </div>
          </div>
          <div className="stg-col-8 stg-tp-col-6">
            <iframe
              className="bringer-google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5803.742555558329!2d21.869471595950657!3d43.33788258447494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b717fb152f47%3A0xfb48ec15f0fdaa00!2sKopex%20MIN%2C%20Bulevar%2012.%20februara%2C%20Ni%C5%A1%2018000!5e0!3m2!1sen!2srs!4v1755568799285!5m2!1sen!2srs"
              referrerPolicy="no-referrer-when-downgrade"
              width={790}
              height={379}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="backlight-top is-fullwidth">
        <div className="stg-row stg-valign-middle stg-cta-with-image stg-tp-column-reverse">
          <div className="stg-col-5">
            <div className="bringer-offset-image" data-bg-src="/img/cta/contact-section-bg.jpg"></div>
            <form action="/api/contact" method="post" className="bringer-contact-form bringer-block" data-fill-error="Molimo popunite formu.">
              <div className="bringer-form-content">
                <label htmlFor="name">Ime i prezime</label>
                <input type="text" id="name" name="name" placeholder="Ime i prezime" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="email@primer.rs" required />
                <label htmlFor="message">Poruka</label>
                <textarea id="message" name="message" placeholder="Vasa poruka" required></textarea>
                <button type="submit">Posalji poruku</button>
                <div className="bringer-contact-form__response"></div>
              </div>
              <span className="bringer-form-spinner"></span>
            </form>
          </div>
          <div className="stg-col-6 stg-offset-1">
            <div className="bringer-cta-form-content">
              <div className="bringer-cta-form-title">Zainteresovani ste za saradnju?</div>
              <div className="bringer-cta-text">
                <p className="bringer-large-text">Posaljite nam upit i dostavite specifikacije. Nas tim odgovara brzo i precizno.</p>
              </div>
              <div className="bringer-cta-counters bringer-grid-3cols bringer-m-grid-3cols" data-stagger-appear="fade-up" data-stagger-delay="100">
                <div className="bringer-counter bringer-small-counter" data-delay="3000">
                  <div className="bringer-counter-number">1884</div>
                  <div className="bringer-counter-label">Godina osnivanja</div>
                </div>
                <div className="bringer-counter bringer-small-counter" data-delay="3000">
                  <div className="bringer-counter-number" data-suffix=" t">100</div>
                  <div className="bringer-counter-label">Mesecni kapacitet</div>
                </div>
                <div className="bringer-counter bringer-small-counter" data-delay="3000">
                  <div className="bringer-counter-number" data-suffix=" t">6</div>
                  <div className="bringer-counter-label">Max tezina odlivka</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

