import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminProductsPageClient from '@/components/AdminProductsPageClient';
import { getProductsList } from '@/lib/products';
import type { ProductItem } from '@/lib/products';
import { LANGUAGE_COOKIE, resolveLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const ADMIN_PRODUCTS_META: Record<Language, { title: string; description: string }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Admin proizvodi',
    description: 'Administracija proizvoda KOPEX MIN-LIV.'
  },
  en: {
    title: 'KOPEX MIN-LIV | Admin products',
    description: 'KOPEX MIN-LIV product administration.'
  },
  de: {
    title: 'KOPEX MIN-LIV | Admin Produkte',
    description: 'Administration der KOPEX MIN-LIV Produkte.'
  }
};

export async function generateMetadata({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const cookieStore = await cookies();
  const resolvedSearchParams = await searchParams;
  const language = resolveLanguage(resolvedSearchParams?.lang, cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = ADMIN_PRODUCTS_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    path: `/admin/products?lang=${language}`
  });
}

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  let items: ProductItem[] = [];
  let errorMessage: string | null = null;

  try {
    items = await getProductsList({ includeInactive: true });
  } catch (error) {
    console.error('Admin products list error:', error);
    errorMessage = 'Ne mogu da ucitam proizvode. Proverite bazu i env podesavanja.';
  }

  return <AdminProductsPageClient items={items} errorMessage={errorMessage} />;
}
