import type { MetadataRoute } from 'next';
import { getNewsList } from '@/lib/news';
import { getProductsList } from '@/lib/products';

const BASE_URL = 'https://kopexmin.rs';

const STATIC_ROUTES = [
  '',
  '/about-us',
  '/history',
  '/management',
  '/services',
  '/services/proizvodni-program',
  '/services/pregled-opreme',
  '/services/tehnoloski-proces-rada',
  '/products',
  '/gallery',
  '/news',
  '/contacts'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7
  }));

  let productEntries: MetadataRoute.Sitemap = [];
  let newsEntries: MetadataRoute.Sitemap = [];

  try {
    const products = await getProductsList();
    productEntries = products.map((product) => ({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt || product.createdAt || now),
      changeFrequency: 'weekly',
      priority: 0.8
    }));
  } catch (error) {
    console.error('Sitemap products error:', error);
  }

  try {
    const news = await getNewsList();
    newsEntries = news.map((item) => ({
      url: `${BASE_URL}/news/${item.id}`,
      lastModified: new Date(item.createdAt || now),
      changeFrequency: 'weekly',
      priority: 0.7
    }));
  } catch (error) {
    console.error('Sitemap news error:', error);
  }

  return [...staticEntries, ...productEntries, ...newsEntries];
}
