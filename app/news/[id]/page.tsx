import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

const toSnippet = (body: string): string => {
  const trimmed = body.replace(/\s+/g, ' ').trim();
  if (!trimmed) {
    return 'Detalji vesti.';
  }
  return trimmed.length > 160 ? `${trimmed.slice(0, 160)}...` : trimmed;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = parseId(params.id);
  if (!id) {
    return { title: 'Vest nije pronadjena' };
  }

  const item = await getNewsById(id);
  if (!item) {
    return { title: 'Vest nije pronadjena' };
  }

  return {
    title: `KOPEX MIN-LIV | ${item.title}`,
    description: toSnippet(item.body)
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const id = parseId(params.id);
  if (!id) {
    notFound();
  }

  const item = await getNewsById(id);
  if (!item) {
    notFound();
  }

  return <NewsDetailClient item={item} />;
}
