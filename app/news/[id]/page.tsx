import NewsDetailClient from '@/components/NewsDetailClient';
import { cookies } from 'next/headers';
import { getNewsById } from '@/lib/news';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const normalizeId = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
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
