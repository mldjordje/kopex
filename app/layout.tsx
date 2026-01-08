import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteStateSync from '@/components/RouteStateSync';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kopexmin.rs'),
  title: {
    default: 'KOPEX MIN-LIV | Industrijska livnica gvo\u017e\u0111a i \u010delika Ni\u0161',
    template: '%s | KOPEX MIN-LIV'
  },
  description: 'Industrijska livnica u Ni\u0161u za livenje metala i proizvodnju metalnih odlivaka.',
  icons: {
    icon: '/img/favicon.png'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="sr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700&amp;family=Space+Grotesk:wght@400;500;600;700&amp;display=swap"
        />
        <link rel="stylesheet" href="/css/config.css" />
        <link rel="stylesheet" href="/css/libs.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body className="theme-light is-loaded">
        <RouteStateSync />
        <Header />
        <main id="bringer-main">
          {children}
          <Footer />
        </main>
        <div className="bringer-backlight"></div>
        <Script src="/js/lib/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/js/lib/libs.js" strategy="afterInteractive" />
        <Script src="/js/contact_form.js" strategy="afterInteractive" />
        <Script src="/js/st-core.js" strategy="afterInteractive" />
        <Script src="/js/classes.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}


