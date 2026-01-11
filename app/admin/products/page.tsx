import type { Metadata } from 'next';
import AdminProductsPageClient from '@/components/AdminProductsPageClient';
import { getProductsList } from '@/lib/products';
import type { ProductItem } from '@/lib/products';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Admin proizvodi',
  description: 'Administracija proizvoda.'
};

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
