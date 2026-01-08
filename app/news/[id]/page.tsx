import NewsDetailClient from '@/components/NewsDetailClient';
import { getNewsById } from '@/lib/news';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    id: string;
  };
};

const parseId = (value: string): number | null => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
};

export default async function NewsDetailPage({ params }: PageProps) {
  const id = parseId(params.id);
  if (!id) {
    return <NewsDetailClient item={null} errorMessage="Neispravan ID vesti." />;
  }

  try {
    const item = await getNewsById(id);
    if (!item) {
      return <NewsDetailClient item={null} errorMessage="Vest nije pronadjena." />;
    }
    return <NewsDetailClient item={item} />;
  } catch (error) {
    console.error('News detail error:', error);
    return <NewsDetailClient item={null} errorMessage="Ne mogu da ucitam vest." />;
  }
}
