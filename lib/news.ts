import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { revalidateTag, unstable_cache } from 'next/cache';
import { queryDb } from './db';

export type NewsItem = {
  id: string;
  title: string;
  body: string;
  images: string[];
  createdAt: string;
};

type NewsRow = RowDataPacket & {
  id: number | string;
  title: string;
  body: string;
  images: unknown;
  created_at: Date | string;
};

const NEWS_REVALIDATE_SECONDS = 5 * 60;
const NEWS_CACHE_TAG = 'news';

const parseImages = (value: unknown): string[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string');
    }
  } catch {
    return [];
  }

  return [];
};

const toIsoDate = (value: Date | string): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return new Date(value).toISOString();
};

const normalizeId = (value: number | string): string => String(value).trim();

const fetchNewsList = async (): Promise<NewsItem[]> => {
  const rows = await queryDb<NewsRow[]>(
    'SELECT id, title, body, images, created_at FROM news ORDER BY created_at DESC, id DESC'
  );

  return rows.map((row) => ({
    id: normalizeId(row.id),
    title: row.title,
    body: row.body,
    images: parseImages(row.images),
    createdAt: toIsoDate(row.created_at)
  }));
};

const fetchNewsById = async (id: string): Promise<NewsItem | null> => {
  const rows = await queryDb<NewsRow[]>(
    'SELECT id, title, body, images, created_at FROM news WHERE id = ? LIMIT 1',
    [id]
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  return {
    id: normalizeId(row.id),
    title: row.title,
    body: row.body,
    images: parseImages(row.images),
    createdAt: toIsoDate(row.created_at)
  };
};

const getCachedNewsList = unstable_cache(
  fetchNewsList,
  ['news-list'],
  { revalidate: NEWS_REVALIDATE_SECONDS, tags: [NEWS_CACHE_TAG] }
);

const getCachedNewsById = unstable_cache(
  (id: string) => fetchNewsById(id),
  ['news-by-id'],
  { revalidate: NEWS_REVALIDATE_SECONDS, tags: [NEWS_CACHE_TAG] }
);

export const getNewsList = async (): Promise<NewsItem[]> => {
  return getCachedNewsList();
};

export const getNewsById = async (id: string): Promise<NewsItem | null> => {
  return getCachedNewsById(id);
};

export const createNewsEntry = async ({
  title,
  body,
  images
}: {
  title: string;
  body: string;
  images: string[];
}): Promise<string> => {
  const payload = images.length ? JSON.stringify(images) : null;
  const result = await queryDb<ResultSetHeader>(
    'INSERT INTO news (title, body, images) VALUES (?, ?, ?)',
    [title, body, payload]
  );
  revalidateTag(NEWS_CACHE_TAG, 'max');
  return String(result.insertId);
};

export const updateNewsEntry = async ({
  id,
  title,
  body,
  images
}: {
  id: string;
  title: string;
  body: string;
  images?: string[];
}): Promise<void> => {
  if (images !== undefined) {
    const payload = images.length ? JSON.stringify(images) : null;
    await queryDb<ResultSetHeader>(
      'UPDATE news SET title = ?, body = ?, images = ? WHERE id = ?',
      [title, body, payload, id]
    );
    revalidateTag(NEWS_CACHE_TAG, 'max');
    return;
  }

  await queryDb<ResultSetHeader>(
    'UPDATE news SET title = ?, body = ? WHERE id = ?',
    [title, body, id]
  );
  revalidateTag(NEWS_CACHE_TAG, 'max');
};

export const deleteNewsEntry = async (id: string): Promise<void> => {
  await queryDb<ResultSetHeader>('DELETE FROM news WHERE id = ?', [id]);
  revalidateTag(NEWS_CACHE_TAG, 'max');
};
