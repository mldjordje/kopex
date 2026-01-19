import type { Metadata } from 'next';
import { getOpenGraphLocale, type Language } from './language';

export const SITE_NAME = 'KOPEX MIN-LIV';
export const SEO_IMAGE = '/icon.png';

type BuildMetadataOptions = {
  language: Language;
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  keywords?: string[];
};

export const buildMetadata = ({
  language,
  title,
  description,
  path = '/',
  type = 'website',
  keywords
}: BuildMetadataOptions): Metadata => ({
  title,
  description,
  keywords,
  alternates: {
    canonical: path
  },
  openGraph: {
    title,
    description,
    type,
    siteName: SITE_NAME,
    locale: getOpenGraphLocale(language),
    url: path,
    images: [
      {
        url: SEO_IMAGE,
        alt: SITE_NAME
      }
    ]
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [SEO_IMAGE]
  }
});
