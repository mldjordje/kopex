import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteStateSync from '@/components/RouteStateSync';
import { LANGUAGE_COOKIE, normalizeLanguage } from '@/lib/language';
import { SEO_IMAGE, SITE_NAME } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kopexmin.rs'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Industrijska livnica u Ni\u0161u za livenje metala i proizvodnju metalnih odlivaka.',
  icons: {
    icon: SEO_IMAGE,
    shortcut: SEO_IMAGE,
    apple: SEO_IMAGE
  },
  openGraph: {
    title: SITE_NAME,
    description: 'Industrijska livnica u Ni\u0161u za livenje metala i proizvodnju metalnih odlivaka.',
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: SEO_IMAGE,
        alt: SITE_NAME
      }
    ]
  },
  twitter: {
    card: 'summary',
    title: SITE_NAME,
    description: 'Industrijska livnica u Ni\u0161u za livenje metala i proizvodnju metalnih odlivaka.',
    images: [SEO_IMAGE]
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);

  return (
    <html lang={language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/img/kopex/production-02.jpg"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/img/kopex/facility-front.jpg"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
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
        <Analytics />
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

