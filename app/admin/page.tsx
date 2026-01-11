import type { Metadata } from 'next';
import AdminHomeClient from '@/components/AdminHomeClient';

export const metadata: Metadata = {
  title: 'KOPEX MIN-LIV | Admin',
  description: 'Administracija sajta.'
};

export default function AdminPage() {
  return <AdminHomeClient />;
}
