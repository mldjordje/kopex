import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { getDb } from './db';

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

export const getNewsList = async (): Promise<NewsItem[]> => {
  const [rows] = await getDb().query<NewsRow[]>(
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

export const getNewsById = async (id: string): Promise<NewsItem | null> => {
  const [rows] = await getDb().query<NewsRow[]>(
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
  const [result] = await getDb().query<ResultSetHeader>(
    'INSERT INTO news (title, body, images) VALUES (?, ?, ?)',
    [title, body, payload]
  );
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
    await getDb().query<ResultSetHeader>(
      'UPDATE news SET title = ?, body = ?, images = ? WHERE id = ?',
      [title, body, payload, id]
    );
    return;
  }

  await getDb().query<ResultSetHeader>(
    'UPDATE news SET title = ?, body = ? WHERE id = ?',
    [title, body, id]
  );
};

export const deleteNewsEntry = async (id: string): Promise<void> => {
  await getDb().query<ResultSetHeader>('DELETE FROM news WHERE id = ?', [id]);
};
