import type { Metadata } from 'next';
import NewsDetailClient from '@/components/NewsDetailClient';
import { cookies } from 'next/headers';
import { getNewsById } from '@/lib/news';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const normalizeId = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed;
};

const getSnippet = (value: string, limit: number): string => {
  const block = value
    .split(/\n+/)
    .map((item) => item.trim())
    .find(Boolean);
  const preview = (block || value).replace(/\s+/g, ' ').trim();
  if (!preview) {
    return '';
  }
  if (preview.length <= limit) {
    return preview;
  }
  return `${preview.slice(0, limit)}...`;
};

const NEWS_META_LABELS: Record<Language, { invalidTitle: string; invalidDescription: string; notFoundTitle: string; notFoundDescription: string }> = {
  sr: {
    invalidTitle: 'Neispravna vest | KOPEX MIN-LIV',
    invalidDescription: 'Neispravan ID vesti.',
    notFoundTitle: 'Vest nije pronadjena | KOPEX MIN-LIV',
    notFoundDescription: 'Vest nije pronadjena.'
  },
  en: {
    invalidTitle: 'Invalid news item | KOPEX MIN-LIV',
    invalidDescription: 'Invalid news ID.',
    notFoundTitle: 'News item not found | KOPEX MIN-LIV',
    notFoundDescription: 'News item not found.'
  },
  de: {
    invalidTitle: 'Ungultige Nachricht | KOPEX MIN-LIV',
    invalidDescription: 'Ungultige Nachrichten-ID.',
    notFoundTitle: 'Nachricht nicht gefunden | KOPEX MIN-LIV',
    notFoundDescription: 'Nachricht nicht gefunden.'
  }
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const labels = NEWS_META_LABELS[language];
  const resolvedParams = await params;
  const id = normalizeId(resolvedParams.id);
  if (!id) {
    return buildMetadata({
      language,
      title: labels.invalidTitle,
      description: labels.invalidDescription,
      path: `/news?lang=${language}`
    });
  }

  try {
    const item = await getNewsById(id);
    if (!item) {
      return buildMetadata({
        language,
        title: labels.notFoundTitle,
        description: labels.notFoundDescription,
        path: `/news/${id}?lang=${language}`
      });
    }
    const description = getSnippet(item.body, 180) || labels.notFoundDescription;
    return buildMetadata({
      language,
      title: `${item.title} | KOPEX MIN-LIV`,
      description,
      path: `/news/${id}?lang=${language}`,
      type: 'article'
    });
  } catch (error) {
    console.error('News metadata error:', error);
    return buildMetadata({
      language,
      title: labels.notFoundTitle,
      description: labels.notFoundDescription,
      path: `/news/${id}?lang=${language}`
    });
  }
}

export default async function NewsDetailPage({ params, searchParams }: PageProps) {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const labels: Record<Language, { invalidId: string; notFound: string; loadError: string }> = {
    sr: {
      invalidId: 'Neispravan ID vesti.',
      notFound: 'Vest nije pronadjena.',
      loadError: 'Ne mogu da ucitam vest.'
    },
    en: {
      invalidId: 'Invalid news ID.',
      notFound: 'News item not found.',
      loadError: 'Unable to load news item.'
    },
    de: {
      invalidId: 'Ung\u00fcltige Nachrichten-ID.',
      notFound: 'Nachricht nicht gefunden.',
      loadError: 'Nachricht konnte nicht geladen werden.'
    }
  };
  const resolvedParams = await params;
  const id = normalizeId(resolvedParams.id);
  if (!id) {
    return <NewsDetailClient item={null} errorMessage={labels[language].invalidId} />;
  }

  try {
    const item = await getNewsById(id);
    if (!item) {
      return <NewsDetailClient item={null} errorMessage={labels[language].notFound} />;
    }
    return <NewsDetailClient item={item} />;
  } catch (error) {
    console.error('News detail error:', error);
    return <NewsDetailClient item={null} errorMessage={labels[language].loadError} />;
  }
}
