import type { Metadata } from 'next';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const CONTACTS_META: Record<Language, { title: string; description: string; keywords: string[] }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Kontakt',
    description: 'Kontaktirajte KOPEX MIN-LIV u Nisu - Bulevar 12. februara 82. Telefon, email i mapa.',
    keywords: ['kontakt', 'adresa', 'telefon', 'email', 'Kopex MIN-LIV', 'Nis']
  },
  en: {
    title: 'KOPEX MIN-LIV | Contact',
    description: 'Contact KOPEX MIN-LIV in Nis - Bulevar 12. februara 82. Phone, email, and map.',
    keywords: ['contact', 'address', 'phone', 'email', 'KOPEX MIN-LIV', 'Nis']
  },
  de: {
    title: 'KOPEX MIN-LIV | Kontakt',
    description: 'Kontaktieren Sie KOPEX MIN-LIV in Nis - Bulevar 12. februara 82. Telefon, E-Mail und Karte.',
    keywords: ['kontakt', 'adresse', 'telefon', 'email', 'KOPEX MIN-LIV', 'Nis']
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
  const meta = CONTACTS_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    path: `/contacts?lang=${language}`
  });
}

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
  inquiryPhonesTitle: string;
  inquiryPhones: [string, string, string];
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
    inquiryPhonesTitle: 'Telefon za upit',
    inquiryPhones: [
      'Komercijala / 063 465 494, 063 1059 426, 063 105 7902',
      'Nabavka / 063 105 7742',
      'Finansije / 063 105 0649'
    ],
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
    inquiryPhonesTitle: 'Inquiry phones',
    inquiryPhones: [
      'Commercial / 063 465 494, 063 1059 426, 063 105 7902',
      'Procurement / 063 105 7742',
      'Finance / 063 105 0649'
    ],
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
    inquiryPhonesTitle: 'Telefon fur Anfragen',
    inquiryPhones: [
      'Kommerziell / 063 465 494, 063 1059 426, 063 105 7902',
      'Einkauf / 063 105 7742',
      'Finanzen / 063 105 0649'
    ],
    counter1Label: 'Gründungsjahr',
    counter2Label: 'Monatskapazität',
    counter3Label: 'Max. Gussteilgewicht'
  }
};

export default async function ContactsPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
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
            src="/img/kopex/facility-front.jpg"
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
              <a href="tel:+38163465494" className="bringer-grid-item-link"></a>
              <div>
                <h5>{copy.phoneTitle}<span className="bringer-accent">.</span></h5>
                <h6>
                  Komercijala / 063 465 494, 063 1059 426, 063 105 7902
                  <br />
                  Nabavka / 063 105 7742
                  <br />
                  Finansije / 063 105 0649
                </h6>
              </div>
              <p>{copy.phoneBody}</p>
            </div>
          </div>
          <div className="stg-col-4 stg-tp-col-6 stg-tp-bottom-gap">
            <div className="bringer-block stg-aspect-square stg-vertical-space-between">
              <a href="mailto:dragan.drenic@kopexmin.rs" className="bringer-grid-item-link"></a>
              <div>
                <h5>{copy.emailTitle}<span className="bringer-accent">.</span></h5>
                <h6>
                  Komercijala / dragan.drenic@kopexmin.rs / marija.nesic@kopexmin.rs / marina.radenkovic@kopexmin.rs
                  <br />
                  Nabavka / dejan.ivanovic@kopexmin.rs
                  <br />
                  Finansije / olivera.milic@kopexmin.rs
                </h6>
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
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kopex%20MIN-LIV%2C%20Bulevar%2012.%20februara%2082%2C%20Ni%C5%A1"
                className="bringer-grid-item-link"
                target="_blank"
                rel="noreferrer"
              ></a>
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
              src="https://www.google.com/maps?q=Kopex%20MIN-LIV%20Bulevar%2012.%20februara%2082%2C%20Ni%C5%A1&output=embed"
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
            <div className="bringer-offset-image" data-bg-src="/img/kopex/production-02.jpg"></div>
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
              <div className="bringer-cta-text">
                <p>
                  <strong>{copy.inquiryPhonesTitle}</strong>
                  <br />
                  {copy.inquiryPhones[0]}
                  <br />
                  {copy.inquiryPhones[1]}
                  <br />
                  {copy.inquiryPhones[2]}
                </p>
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

