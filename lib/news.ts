import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { getDb } from './db';

export type NewsItem = {
  id: number;
  title: string;
  body: string;
  images: string[];
  createdAt: string;
};

type NewsRow = RowDataPacket & {
  id: number;
  title: string;
  body: string;
  images: unknown;
  created_at: Date | string;
};

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

export const getNewsList = async (): Promise<NewsItem[]> => {
  const [rows] = await getDb().query<NewsRow[]>(
    'SELECT id, title, body, images, created_at FROM news ORDER BY created_at DESC, id DESC'
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    images: parseImages(row.images),
    createdAt: toIsoDate(row.created_at)
  }));
};

export const createNewsEntry = async ({
  title,
  body,
  images
}: {
  title: string;
  body: string;
  images: string[];
}): Promise<number> => {
  const payload = images.length ? JSON.stringify(images) : null;
  const [result] = await getDb().query<ResultSetHeader>(
    'INSERT INTO news (title, body, images) VALUES (?, ?, ?)',
    [title, body, payload]
  );
  return result.insertId;
};
