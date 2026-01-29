import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { queryDb } from './db';

export type ProductDocument = {
  name: string;
  url: string;
};

export type ProductItem = {
  id: number;
  name: string;
  slug: string;
  summary: string | null;
  description: string | null;
  category: string | null;
  heroImage: string | null;
  gallery: string[];
  documents: ProductDocument[];
  seoTitle: string | null;
  seoDescription: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type ProductRow = RowDataPacket & {
  id: number;
  name: string;
  slug: string;
  summary: string | null;
  description: string | null;
  category: string | null;
  hero_image: string | null;
  gallery_images: unknown;
  documents: unknown;
  seo_title: string | null;
  seo_description: string | null;
  is_active: number | boolean;
  sort_order: number;
  created_at: Date | string;
  updated_at: Date | string;
};

const parseStringArray = (value: unknown): string[] => {
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

const parseDocuments = (value: unknown): ProductDocument[] => {
  if (!value) {
    return [];
  }

  const toDocFromString = (url: string): ProductDocument => ({
    name: url.split('/').pop() || 'Dokument',
    url
  });

  const toDoc = (item: unknown): ProductDocument | null => {
    if (!item || typeof item !== 'object') {
      return null;
    }
    const record = item as { name?: unknown; url?: unknown };
    if (typeof record.url !== 'string') {
      return null;
    }
    const name = typeof record.name === 'string' && record.name.trim()
      ? record.name.trim()
      : record.url.split('/').pop() || 'Dokument';
    return { name, url: record.url };
  };

  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === 'string') {
        return [toDocFromString(item)];
      }
      const doc = toDoc(item);
      return doc ? [doc] : [];
    });
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.flatMap((item) => {
        if (typeof item === 'string') {
          return [toDocFromString(item)];
        }
        const doc = toDoc(item);
        return doc ? [doc] : [];
      });
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

const transliterationMap: Record<string, string> = {
  '\u010d': 'c',
  '\u0107': 'c',
  '\u017e': 'z',
  '\u0161': 's',
  '\u0111': 'dj'
};

const normalizeSlug = (value: string): string => {
  const transliterated = value
    .toLowerCase()
    .trim()
    .replace(/[\u010d\u0107\u017e\u0161\u0111]/g, (match) => transliterationMap[match] || match);

  const slug = transliterated
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'proizvod';
};

const ensureUniqueSlug = async (slug: string, excludeId?: number): Promise<string> => {
  const base = normalizeSlug(slug);
  const params: (string | number)[] = [`${base}%`];
  let query = 'SELECT slug FROM products WHERE slug LIKE ?';
  if (excludeId) {
    query += ' AND id <> ?';
    params.push(excludeId);
  }

  const rows = await queryDb<RowDataPacket[]>(query, params);
  const existing = new Set(rows.map((row) => String((row as { slug?: unknown }).slug || '')));

  if (!existing.has(base)) {
    return base;
  }

  let counter = 2;
  while (existing.has(`${base}-${counter}`)) {
    counter += 1;
  }

  return `${base}-${counter}`;
};

const mapRow = (row: ProductRow): ProductItem => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  summary: row.summary ?? null,
  description: row.description ?? null,
  category: row.category ?? null,
  heroImage: row.hero_image ?? null,
  gallery: parseStringArray(row.gallery_images),
  documents: parseDocuments(row.documents),
  seoTitle: row.seo_title ?? null,
  seoDescription: row.seo_description ?? null,
  isActive: Boolean(row.is_active),
  sortOrder: Number(row.sort_order || 0),
  createdAt: toIsoDate(row.created_at),
  updatedAt: toIsoDate(row.updated_at)
});

export const getProductsList = async ({
  includeInactive = false
}: { includeInactive?: boolean } = {}): Promise<ProductItem[]> => {
  const whereClause = includeInactive ? '' : 'WHERE is_active = 1';
  const rows = await queryDb<ProductRow[]>(
    `SELECT id, name, slug, summary, description, category, hero_image, gallery_images, documents, seo_title, seo_description, is_active, sort_order, created_at, updated_at
     FROM products
     ${whereClause}
     ORDER BY sort_order ASC, created_at DESC, id DESC`
  );

  return rows.map(mapRow);
};

export const getProductById = async (id: number): Promise<ProductItem | null> => {
  const rows = await queryDb<ProductRow[]>(
    `SELECT id, name, slug, summary, description, category, hero_image, gallery_images, documents, seo_title, seo_description, is_active, sort_order, created_at, updated_at
     FROM products
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  return mapRow(row);
};

export const getProductBySlug = async (slug: string): Promise<ProductItem | null> => {
  const rows = await queryDb<ProductRow[]>(
    `SELECT id, name, slug, summary, description, category, hero_image, gallery_images, documents, seo_title, seo_description, is_active, sort_order, created_at, updated_at
     FROM products
     WHERE slug = ?
     LIMIT 1`,
    [slug]
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  return mapRow(row);
};

export const createProductEntry = async ({
  name,
  slug,
  summary,
  description,
  category,
  heroImage,
  gallery,
  documents,
  seoTitle,
  seoDescription,
  isActive,
  sortOrder
}: {
  name: string;
  slug?: string;
  summary?: string | null;
  description?: string | null;
  category?: string | null;
  heroImage?: string | null;
  gallery?: string[];
  documents?: ProductDocument[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  isActive?: boolean;
  sortOrder?: number;
}): Promise<{ id: number; slug: string }> => {
  const resolvedSlug = await ensureUniqueSlug(slug?.trim() || name);
  const galleryPayload = gallery && gallery.length ? JSON.stringify(gallery) : null;
  const documentsPayload = documents && documents.length ? JSON.stringify(documents) : null;

  const result = await queryDb<ResultSetHeader>(
    `INSERT INTO products (name, slug, summary, description, category, hero_image, gallery_images, documents, seo_title, seo_description, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      resolvedSlug,
      summary || null,
      description || null,
      category || null,
      heroImage || null,
      galleryPayload,
      documentsPayload,
      seoTitle || null,
      seoDescription || null,
      isActive === false ? 0 : 1,
      Number.isFinite(sortOrder) ? Number(sortOrder) : 0
    ]
  );

  return { id: result.insertId, slug: resolvedSlug };
};

export const updateProductEntry = async ({
  id,
  name,
  slug,
  summary,
  description,
  category,
  heroImage,
  gallery,
  documents,
  seoTitle,
  seoDescription,
  isActive,
  sortOrder
}: {
  id: number;
  name: string;
  slug?: string;
  summary?: string | null;
  description?: string | null;
  category?: string | null;
  heroImage?: string | null;
  gallery?: string[];
  documents?: ProductDocument[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  isActive?: boolean;
  sortOrder?: number;
}): Promise<string> => {
  const resolvedSlug = await ensureUniqueSlug(slug?.trim() || name, id);
  const galleryPayload = gallery && gallery.length ? JSON.stringify(gallery) : null;
  const documentsPayload = documents && documents.length ? JSON.stringify(documents) : null;

  await queryDb<ResultSetHeader>(
    `UPDATE products
     SET name = ?, slug = ?, summary = ?, description = ?, category = ?, hero_image = ?, gallery_images = ?, documents = ?, seo_title = ?, seo_description = ?, is_active = ?, sort_order = ?
     WHERE id = ?`,
    [
      name,
      resolvedSlug,
      summary || null,
      description || null,
      category || null,
      heroImage || null,
      galleryPayload,
      documentsPayload,
      seoTitle || null,
      seoDescription || null,
      isActive === false ? 0 : 1,
      Number.isFinite(sortOrder) ? Number(sortOrder) : 0,
      id
    ]
  );

  return resolvedSlug;
};

export const deleteProductEntry = async (id: number): Promise<void> => {
  await queryDb<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
};
