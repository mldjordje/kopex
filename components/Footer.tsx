'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { normalizeLanguage, type Language } from '@/lib/language';

export default function Footer() {
  const searchParams = useSearchParams();
  const currentLanguage = normalizeLanguage(
    searchParams.get('lang') ?? (typeof document !== 'undefined' ? document.documentElement.lang : undefined)
  );
  const buildLocalizedHref = (target: string): string => {
    const [base, hash] = target.split('#');
    const params = new URLSearchParams();
    params.set('lang', currentLanguage);
    const query = params.toString();
    const href = query ? `${base}?${query}` : base;
    return hash ? `${href}#${hash}` : href;
  };

  const labels: Record<Language, {
    contact: string;
    quickLinks: string;
    about: string;
    services: string;
    products: string;
    news: string;
    management: string;
    clients: string;
    address: string;
    phone: string;
    email: string;
    follow: string;
    description: string;
    copyright: string;
  }> = {
    sr: {
      contact: 'Kontakt',
      quickLinks: 'Brzi linkovi',
      about: 'O nama',
      services: 'Opremljenost',
      products: 'Proizvodi',
      news: 'Vesti / Karijera',
      management: 'Rukovodstvo firme',
      clients: 'Kupci',
      address: 'Bulevar 12. februara 82, Ni\u0161',
      phone: 'Telefon: Komercijala / 063 465 494, 063 1059 426, 063 105 7902; Nabavka / 063 105 7742; Finansije / 063 105 0649',
      email: 'Email: Komercijala / dragan.drenic@kopexmin.rs / marija.nesic@kopexmin.rs / marina.radenkovic@kopexmin.rs; Nabavka / dejan.ivanovic@kopexmin.rs; Finansije / olivera.milic@kopexmin.rs',
      follow: 'Pratite nas:',
      description: 'KOPEX MIN-LIV A.D. Ni\u0161 je industrijska livnica Srbije sa tradicijom od 1884. godine, specijalizovana za metalne odlivke od sivog, nodularnog i \u010deli\u010dnog liva.',
      copyright: '\u00a9 2025 KOPEX MIN-LIV A.D. Ni\u0161. Sva prava zadr\u017eana.'
    },
    en: {
      contact: 'Contact',
      quickLinks: 'Quick links',
      about: 'About us',
      services: 'Equipment',
      products: 'Products',
      news: 'News / Careers',
      management: 'Management',
      clients: 'Clients',
      address: 'Bulevar 12. februara 82, Ni\u0161',
      phone: 'Phone: Commercial / 063 465 494, 063 1059 426, 063 105 7902; Procurement / 063 105 7742; Finance / 063 105 0649',
      email: 'Email: Commercial / dragan.drenic@kopexmin.rs / marija.nesic@kopexmin.rs / marina.radenkovic@kopexmin.rs; Procurement / dejan.ivanovic@kopexmin.rs; Finance / olivera.milic@kopexmin.rs',
      follow: 'Follow us:',
      description: 'KOPEX MIN-LIV A.D. Ni\u0161 is an industrial foundry in Serbia with a tradition since 1884, specializing in metal castings of gray iron, ductile iron, and steel.',
      copyright: '\u00a9 2025 KOPEX MIN-LIV A.D. Ni\u0161. All rights reserved.'
    },
    de: {
      contact: 'Kontakt',
      quickLinks: 'Schnellzugriff',
      about: '\u00dcber uns',
      services: 'Ausstattung',
      products: 'Produkte',
      news: 'News / Karriere',
      management: 'Gesch\u00e4ftsleitung',
      clients: 'Kunden',
      address: 'Bulevar 12. februara 82, Ni\u0161',
      phone: 'Telefon: Kommerziell / 063 465 494, 063 1059 426, 063 105 7902; Einkauf / 063 105 7742; Finanzen / 063 105 0649',
      email: 'E-Mail: Kommerziell / dragan.drenic@kopexmin.rs / marija.nesic@kopexmin.rs / marina.radenkovic@kopexmin.rs; Einkauf / dejan.ivanovic@kopexmin.rs; Finanzen / olivera.milic@kopexmin.rs',
      follow: 'Folgen Sie uns:',
      description: 'KOPEX MIN-LIV A.D. Ni\u0161 ist eine industrielle Gie\u00dferei in Serbien mit Tradition seit 1884 und spezialisiert auf Metallgussteile aus Grauguss, Sph\u00e4roguss und Stahlguss.',
      copyright: '\u00a9 2025 KOPEX MIN-LIV A.D. Ni\u0161. Alle Rechte vorbehalten.'
    }
  };

  return (
    <footer id="bringer-footer" data-appear="fade-up" data-unload="fade-down">
      <div className="bringer-footer-widgets">
        <div className="stg-container">
          <div className="stg-row" data-stagger-appear="fade-left" data-stagger-delay="100">
            <div className="stg-col-5 stg-tp-col-12 stg-tp-bottom-gap-l">
              <div className="bringer-info-widget">
                <Link href={buildLocalizedHref('/')} className="bringer-logo footer-logo">
                  <Image src="/img/kopexlogolatest-removebg-preview.png" alt="KOPEX MIN-LIV" width={160} height={40} />
                </Link>
                <div className="bringer-info-description">{labels[currentLanguage].description}</div>
                <span className="bringer-label">{labels[currentLanguage].follow}</span>
                <ul className="bringer-socials-list" data-stagger-appear="fade-up" data-stagger-delay="75">
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
            </div>
            <div className="stg-col-3 stg-tp-col-6 stg-m-col-6">
              <div className="bringer-widget">
                <h6>{labels[currentLanguage].contact}</h6>
                <div className="bringer-menu-widget">
                  <ul>
                    <li>{labels[currentLanguage].address}</li>
                    <li>{labels[currentLanguage].phone}</li>
                    <li>{labels[currentLanguage].email}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="stg-col-3 stg-tp-col-6 stg-m-col-6">
              <div className="bringer-widget">
                <h6>{labels[currentLanguage].quickLinks}</h6>
                <div className="bringer-menu-widget">
                  <ul>
                    <li><Link href={buildLocalizedHref('/about-us')}>{labels[currentLanguage].about}</Link></li>
                    <li><Link href={buildLocalizedHref('/services')}>{labels[currentLanguage].services}</Link></li>
                    <li><Link href={buildLocalizedHref('/products')}>{labels[currentLanguage].products}</Link></li>
                    <li><Link href={buildLocalizedHref('/news')}>{labels[currentLanguage].news}</Link></li>
                    <li><Link href={buildLocalizedHref('/management')}>{labels[currentLanguage].management}</Link></li>
                    <li><Link href={buildLocalizedHref('/#kupci')}>{labels[currentLanguage].clients}</Link></li>
                    <li><Link href={buildLocalizedHref('/contacts')}>{labels[currentLanguage].contact}</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bringer-footer-line stg-container">
        <div className="align-center">
          {labels[currentLanguage].copyright}
        </div>
      </div>
    </footer>
  );
}
