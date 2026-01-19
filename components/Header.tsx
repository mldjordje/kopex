'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const isActivePath = (pathname: string, href: string): boolean => {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href;
};

export default function Header() {
  const pathname = usePathname();

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
          <Link href="/" className="bringer-logo">
            <Image src="/img/kopex/logo.png" alt="KOPEX MIN-LIV" width={160} height={40} />
          </Link>
        </div>
        <div className="bringer-header-mp">
          <nav className="bringer-nav">
            <ul className="main-menu" data-stagger-appear="fade-down" data-stagger-delay="75">
              <li className={isActivePath(pathname, '/') ? 'current-menu-item' : undefined}>
                <Link href="/">Po&#269;etna</Link>
              </li>
              <li>
                <Link href="/products">Proizvodi</Link>
              </li>
              <li className={isActivePath(pathname, '/news') ? 'current-menu-item' : undefined}>
                <Link href="/news">Vesti / Karijera</Link>
              </li>
              <li className={isActivePath(pathname, '/about-us') ? 'current-menu-item' : undefined}>
                <Link href="/about-us">O nama</Link>
              </li>
              <li className={isActivePath(pathname, '/management') ? 'current-menu-item' : undefined}>
                <Link href="/management">Rukovodstvo firme</Link>
              </li>
              <li className={isActivePath(pathname, '/services') ? 'current-menu-item' : undefined}>
                <Link href="/services">Opremljenost</Link>
              </li>
              <li>
                <Link href="/#kupci">Kupci</Link>
              </li>
              <li>
                <Link href="/#sertifikati">Sertifikati</Link>
              </li>
              <li className={isActivePath(pathname, '/contacts') ? 'current-menu-item' : undefined}>
                <Link href="/contacts">Kontakt</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bringer-header-rp">
          <button className="bringer-theme-toggle" type="button" aria-label="Promeni temu" title="Promeni temu">
            <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
            <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          <div className="kopex-lang-switch">
            <Link href="/?lang=sr">SR</Link>
            <span aria-hidden="true">/</span>
            <Link href="/?lang=en">EN</Link>
            <span aria-hidden="true">/</span>
            <Link href="/?lang=de">DE</Link>
          </div>
          <Link href="/contacts" className="bringer-button">Kontakt</Link>
        </div>
      </div>
      <div className="bringer-mobile-header-inner">
        <Link href="/" className="bringer-logo">
          <Image src="/img/kopex/logo.png" alt="KOPEX MIN-LIV" width={160} height={40} />
        </Link>
        <div className="kopex-lang-switch kopex-lang-switch--mobile">
          <Link href="/?lang=sr">SR</Link>
          <span aria-hidden="true">/</span>
          <Link href="/?lang=en">EN</Link>
          <span aria-hidden="true">/</span>
          <Link href="/?lang=de">DE</Link>
        </div>
        <button className="bringer-theme-toggle" type="button" aria-label="Promeni temu" title="Promeni temu">
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
