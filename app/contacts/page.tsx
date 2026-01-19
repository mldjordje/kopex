import type { Metadata } from 'next';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Kontakt',
  description: 'Kontaktirajte KOPEX MIN-LIV A.D. Ni\u0161 - Bulevar 12. februara 82, Ni\u0161.'
};

const FULL_SIZES = '(max-width: 739px) 100vw, 80vw';

const CONTACTS_COPY: Record<Language, {
  title: string;
  lead: string;
  connectTitle: string;
  connectLead: string;
  phoneTitle: string;
  phoneBody: string;
  emailTitle: string;
  emailBody: string;
  socialTitle: string;
  socialBody: string;
  visitTitle: string;
  visitLead: string;
  addressTitle: string;
  addressValue: string;
  addressBody: string;
  formError: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  formButton: string;
  ctaTitle: string;
  ctaLead: string;
  counter1Label: string;
  counter2Label: string;
  counter3Label: string;
}> = {
  sr: {
    title: 'Kontakt',
    lead: 'Kopex Min A.D. Niš je tu da odgovori na sva vaša pitanja i pruži podršku u vezi sa našim uslugama i proizvodima.',
    connectTitle: 'Povežite se sa nama',
    connectLead: 'Evo kako možete stupiti u kontakt sa timom Kopex Min.',
    phoneTitle: 'Telefon',
    phoneBody: 'Pozovite nas direktno i razgovarajte sa našim timom stručnjaka.',
    emailTitle: 'Email',
    emailBody: 'Pošaljite nam detaljnu poruku. Odgovorićemo u najkraćem roku.',
    socialTitle: 'Društvene mreže',
    socialBody: 'Pratite nas na društvenim mrežama i saznajte više o našim projektima i proizvodnji.',
    visitTitle: 'Posetite našu fabriku',
    visitLead: 'Dogovorite obilazak i upoznajte naš tim i proizvodne kapacitete.',
    addressTitle: 'Adresa',
    addressValue: 'Bulevar 12. februara 82, Niš 18000',
    addressBody: 'Posetite našu fabriku i upoznajte se sa proizvodnim procesom.',
    formError: 'Molimo popunite formu.',
    nameLabel: 'Ime i prezime',
    namePlaceholder: 'Ime i prezime',
    emailLabel: 'Email',
    emailPlaceholder: 'email@primer.rs',
    messageLabel: 'Poruka',
    messagePlaceholder: 'Vaša poruka',
    formButton: 'Pošalji poruku',
    ctaTitle: 'Zainteresovani ste za saradnju?',
    ctaLead: 'Pošaljite nam upit i dostavite specifikacije. Naš tim odgovara brzo i precizno.',
    counter1Label: 'Godina osnivanja',
    counter2Label: 'Mesečni kapacitet',
    counter3Label: 'Max težina odlivka'
  },
  en: {
    title: 'Contact',
    lead: 'Kopex Min A.D. Niš is here to answer all your questions and support you regarding our services and products.',
    connectTitle: 'Get in touch',
    connectLead: 'Here is how you can reach the Kopex Min team.',
    phoneTitle: 'Phone',
    phoneBody: 'Call us directly and talk to our expert team.',
    emailTitle: 'Email',
    emailBody: 'Send us a detailed message. We will reply as soon as possible.',
    socialTitle: 'Social media',
    socialBody: 'Follow us on social media and learn more about our projects and production.',
    visitTitle: 'Visit our plant',
    visitLead: 'Arrange a tour and meet our team and production capacities.',
    addressTitle: 'Address',
    addressValue: 'Bulevar 12. februara 82, Niš 18000',
    addressBody: 'Visit our plant and see the production process.',
    formError: 'Please fill out the form.',
    nameLabel: 'Full name',
    namePlaceholder: 'Full name',
    emailLabel: 'Email',
    emailPlaceholder: 'email@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Your message',
    formButton: 'Send message',
    ctaTitle: 'Interested in cooperation?',
    ctaLead: 'Send an inquiry and provide specifications. Our team responds quickly and precisely.',
    counter1Label: 'Founded',
    counter2Label: 'Monthly capacity',
    counter3Label: 'Max casting weight'
  },
  de: {
    title: 'Kontakt',
    lead: 'Kopex Min A.D. Niš beantwortet gerne Ihre Fragen und unterstützt Sie zu unseren Leistungen und Produkten.',
    connectTitle: 'Kontaktieren Sie uns',
    connectLead: 'So erreichen Sie das Kopex Min Team.',
    phoneTitle: 'Telefon',
    phoneBody: 'Rufen Sie uns direkt an und sprechen Sie mit unserem Expertenteam.',
    emailTitle: 'E-Mail',
    emailBody: 'Senden Sie uns eine detaillierte Nachricht. Wir antworten schnellstmöglich.',
    socialTitle: 'Soziale Medien',
    socialBody: 'Folgen Sie uns in den sozialen Medien und erfahren Sie mehr über unsere Projekte und Produktion.',
    visitTitle: 'Besuchen Sie unser Werk',
    visitLead: 'Vereinbaren Sie einen Rundgang und lernen Sie unser Team und die Produktionskapazitäten kennen.',
    addressTitle: 'Adresse',
    addressValue: 'Bulevar 12. februara 82, Niš 18000',
    addressBody: 'Besuchen Sie unser Werk und lernen Sie den Produktionsprozess kennen.',
    formError: 'Bitte füllen Sie das Formular aus.',
    nameLabel: 'Name und Nachname',
    namePlaceholder: 'Name und Nachname',
    emailLabel: 'E-Mail',
    emailPlaceholder: 'email@beispiel.de',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Ihre Nachricht',
    formButton: 'Nachricht senden',
    ctaTitle: 'Interessiert an einer Zusammenarbeit?',
    ctaLead: 'Senden Sie eine Anfrage und Spezifikationen. Unser Team antwortet schnell und präzise.',
    counter1Label: 'Gründungsjahr',
    counter2Label: 'Monatskapazität',
    counter3Label: 'Max. Gussteilgewicht'
  }
};

export default async function ContactsPage() {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const copy = CONTACTS_COPY[language];

  return (
    <div className="stg-container">
      <section className="backlight-bottom">
        <div className="stg-row stg-bottom-gap-l">
          <div className="stg-col-8 stg-offset-2 align-center">
            <h1 className="bringer-page-title">{copy.title}</h1>
            <p className="bringer-large-text">{copy.lead}</p>
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
              <h2>{copy.connectTitle}</h2>
              <p className="bringer-large-text">{copy.connectLead}</p>
            </div>
          </div>
        </div>
        <div className="stg-row" data-stagger-appear="fade-up" data-delay="200" data-stagger-unload="fade-up">
          <div className="stg-col-4 stg-tp-col-6 stg-tp-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="tel:+38118245678" className="bringer-grid-item-link"></a>
              <div>
                <h5>{copy.phoneTitle}<span className="bringer-accent">.</span></h5>
                <h6>+381 18 245 678</h6>
              </div>
              <p>{copy.phoneBody}</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-6 stg-tp-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="mailto:info@kopexmin.rs" className="bringer-grid-item-link"></a>
              <div>
                <h5>{copy.emailTitle}<span className="bringer-accent">.</span></h5>
                <h6>info@kopexmin.rs</h6>
              </div>
              <p>{copy.emailBody}</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-12">
            <div className="bringer-block stg-aspect-square stg-tp-aspect-rectangle stg-vertical-space-between">
              <div>
                <h5>{copy.socialTitle}<span className="bringer-accent">.</span></h5>
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
              <p>{copy.socialBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="stg-row bringer-section-title">
          <div className="stg-col-8 stg-offset-2">
            <div className="align-center">
              <h2>{copy.visitTitle}</h2>
              <p className="bringer-large-text">{copy.visitLead}</p>
            </div>
          </div>
        </div>
        <div className="stg-row">
          <div className="stg-col-4 stg-tp-col-6 stg-m-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="https://www.google.com/maps/place/Kopex+MIN,+Bulevar+12.+februara,+Ni%C5%A1+18000" className="bringer-grid-item-link" target="_blank" rel="noreferrer"></a>
              <div>
                <h5>{copy.addressTitle}<span className="bringer-accent">.</span></h5>
                <h6>{copy.addressValue}</h6>
              </div>
              <p>{copy.addressBody}</p>
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
            <form
              action="/api/contact"
              method="post"
              className="bringer-contact-form bringer-block"
              data-fill-error={copy.formError}
            >
              <div className="bringer-form-content">
                <label htmlFor="name">{copy.nameLabel}</label>
                <input type="text" id="name" name="name" placeholder={copy.namePlaceholder} required />
                <label htmlFor="email">{copy.emailLabel}</label>
                <input type="email" id="email" name="email" placeholder={copy.emailPlaceholder} required />
                <label htmlFor="message">{copy.messageLabel}</label>
                <textarea id="message" name="message" placeholder={copy.messagePlaceholder} required></textarea>
                <button type="submit">{copy.formButton}</button>
                <div className="bringer-contact-form__response"></div>
              </div>
              <span className="bringer-form-spinner"></span>
            </form>
          </div>
          <div className="stg-col-6 stg-offset-1">
            <div className="bringer-cta-form-content">
              <div className="bringer-cta-form-title">{copy.ctaTitle}</div>
              <div className="bringer-cta-text">
                <p className="bringer-large-text">{copy.ctaLead}</p>
              </div>
              <div className="bringer-cta-counters bringer-grid-3cols bringer-m-grid-3cols" data-stagger-appear="fade-up" data-stagger-delay="100">
                <div className="bringer-counter bringer-small-counter" data-delay="3000">
                  <div className="bringer-counter-number">1884</div>
                  <div className="bringer-counter-label">{copy.counter1Label}</div>
                </div>
                <div className="bringer-counter bringer-small-counter" data-delay="3000">
                  <div className="bringer-counter-number" data-suffix=" t">100</div>
                  <div className="bringer-counter-label">{copy.counter2Label}</div>
                </div>
                <div className="bringer-counter bringer-small-counter" data-delay="3000">
                  <div className="bringer-counter-number" data-suffix=" t">6</div>
                  <div className="bringer-counter-label">{copy.counter3Label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

