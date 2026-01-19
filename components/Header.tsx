'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { normalizeLanguage, type Language } from '@/lib/language';

const isActivePath = (pathname: string, href: string): boolean => {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href;
};

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLanguage = normalizeLanguage(
    searchParams.get('lang') ?? (typeof document !== 'undefined' ? document.documentElement.lang : undefined)
  );

  const navLabels: Record<Language, {
    home: string;
    products: string;
    news: string;
    about: string;
    management: string;
    services: string;
    clients: string;
    certificates: string;
    contact: string;
    cta: string;
    themeToggle: string;
  }> = {
    sr: {
      home: 'Po\u010detna',
      products: 'Proizvodi',
      news: 'Vesti / Karijera',
      about: 'O nama',
      management: 'Rukovodstvo firme',
      services: 'Opremljenost',
      clients: 'Kupci',
      certificates: 'Sertifikati',
      contact: 'Kontakt',
      cta: 'Kontakt',
      themeToggle: 'Promeni temu'
    },
    en: {
      home: 'Home',
      products: 'Products',
      news: 'News / Careers',
      about: 'About us',
      management: 'Management',
      services: 'Equipment',
      clients: 'Clients',
      certificates: 'Certificates',
      contact: 'Contact',
      cta: 'Contact',
      themeToggle: 'Toggle theme'
    },
    de: {
      home: 'Startseite',
      products: 'Produkte',
      news: 'News / Karriere',
      about: '\u00dcber uns',
      management: 'Gesch\u00e4ftsleitung',
      services: 'Ausstattung',
      clients: 'Kunden',
      certificates: 'Zertifikate',
      contact: 'Kontakt',
      cta: 'Kontakt',
      themeToggle: 'Theme wechseln'
    }
  };

  const buildLangHref = (language: Language): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', language);
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const buildLocalizedHref = (target: string): string => {
    const [base, hash] = target.split('#');
    const params = new URLSearchParams();
    params.set('lang', currentLanguage);
    const query = params.toString();
    const href = query ? `${base}?${query}` : base;
    return hash ? `${href}#${hash}` : href;
  };

  useEffect(() => {
    const header = document.getElementById('bringer-header');
    if (!header) {
      return;
    }

    header.classList.remove('is-unloading');
    header.classList.add('in-view');
  }, [pathname]);

  return (
    <header id="bringer-header" className="is-frosted is-sticky" data-appear="fade-down" data-unload="fade-up">
      <div className="bringer-header-inner">
        <div className="bringer-header-lp">
          <Link href={buildLocalizedHref('/')} className="bringer-logo">
            <Image src="/img/newlogo.png" alt="KOPEX MIN-LIV" width={160} height={40} />
          </Link>
        </div>
        <div className="bringer-header-mp">
          <nav className="bringer-nav">
            <ul className="main-menu" data-stagger-appear="fade-down" data-stagger-delay="75">
              <li className={isActivePath(pathname, '/') ? 'current-menu-item' : undefined}>
                <Link href={buildLocalizedHref('/')}>{navLabels[currentLanguage].home}</Link>
              </li>
              <li>
                <Link href={buildLocalizedHref('/products')}>{navLabels[currentLanguage].products}</Link>
              </li>
              <li className={isActivePath(pathname, '/news') ? 'current-menu-item' : undefined}>
                <Link href={buildLocalizedHref('/news')}>{navLabels[currentLanguage].news}</Link>
              </li>
              <li className={isActivePath(pathname, '/about-us') ? 'current-menu-item' : undefined}>
                <Link href={buildLocalizedHref('/about-us')}>{navLabels[currentLanguage].about}</Link>
              </li>
              <li className={isActivePath(pathname, '/management') ? 'current-menu-item' : undefined}>
                <Link href={buildLocalizedHref('/management')}>{navLabels[currentLanguage].management}</Link>
              </li>
              <li className={isActivePath(pathname, '/services') ? 'current-menu-item' : undefined}>
                <Link href={buildLocalizedHref('/services')}>{navLabels[currentLanguage].services}</Link>
              </li>
              <li>
                <Link href={buildLocalizedHref('/#kupci')}>{navLabels[currentLanguage].clients}</Link>
              </li>
              <li>
                <Link href={buildLocalizedHref('/#sertifikati')}>{navLabels[currentLanguage].certificates}</Link>
              </li>
              <li className={isActivePath(pathname, '/contacts') ? 'current-menu-item' : undefined}>
                <Link href={buildLocalizedHref('/contacts')}>{navLabels[currentLanguage].contact}</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bringer-header-rp">
          <button
            className="bringer-theme-toggle"
            type="button"
            aria-label={navLabels[currentLanguage].themeToggle}
            title={navLabels[currentLanguage].themeToggle}
          >
            <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
            <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <div className="kopex-lang-switch">
            <Link href={buildLangHref('sr')} aria-current={currentLanguage === 'sr'}>
              SR
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={buildLangHref('en')} aria-current={currentLanguage === 'en'}>
              EN
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={buildLangHref('de')} aria-current={currentLanguage === 'de'}>
              DE
            </Link>
          </div>
          <Link href={buildLocalizedHref('/contacts')} className="bringer-button">
            {navLabels[currentLanguage].cta}
          </Link>
        </div>
      </div>
      <div className="bringer-mobile-header-inner">
        <Link href={buildLocalizedHref('/')} className="bringer-logo">
          <Image src="/img/newlogo.png" alt="KOPEX MIN-LIV" width={160} height={40} />
        </Link>
        <div className="kopex-lang-switch kopex-lang-switch--mobile">
          <Link href={buildLangHref('sr')} aria-current={currentLanguage === 'sr'}>
            SR
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={buildLangHref('en')} aria-current={currentLanguage === 'en'}>
            EN
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={buildLangHref('de')} aria-current={currentLanguage === 'de'}>
            DE
          </Link>
        </div>
        <button
          className="bringer-theme-toggle"
          type="button"
          aria-label={navLabels[currentLanguage].themeToggle}
          title={navLabels[currentLanguage].themeToggle}
        >
          <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
          </svg>
          <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <a href="#" className="bringer-mobile-menu-toggler">
          <i className="bringer-menu-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </i>
        </a>
      </div>
    </header>
  );
}
