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
      address: 'Bulevar 12. februara 82, Niš',
      phone: 'Telefon: +381 18 245 678',
      email: 'Email: info@kopexmin.rs',
      follow: 'Pratite nas:'
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
      address: 'Bulevar 12. februara 82, Niš',
      phone: 'Phone: +381 18 245 678',
      email: 'Email: info@kopexmin.rs',
      follow: 'Follow us:'
    },
    de: {
      contact: 'Kontakt',
      quickLinks: 'Schnellzugriff',
      about: 'Über uns',
      services: 'Ausstattung',
      products: 'Produkte',
      news: 'News / Karriere',
      management: 'Geschäftsleitung',
      clients: 'Kunden',
      address: 'Bulevar 12. februara 82, Niš',
      phone: 'Telefon: +381 18 245 678',
      email: 'E-Mail: info@kopexmin.rs',
      follow: 'Folgen Sie uns:'
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
                  <Image src="/img/kopex/logo.png" alt="KOPEX MIN-LIV" width={160} height={40} />
                </Link>
                <div className="bringer-info-description">KOPEX MIN-LIV A.D. Ni&#353; je industrijska livnica Srbije sa tradicijom od 1884. godine, specijalizovana za metalne odlivke od sivog, nodularnog i &#269;eli&#269;nog liva.</div>
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
          &copy; 2025 KOPEX MIN-LIV A.D. Ni&#353;. Sva prava zadr&#382;ana.
        </div>
      </div>
    </footer>
  );
}
