import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AdminHomeClient from '@/components/AdminHomeClient';
import { LANGUAGE_COOKIE, normalizeLanguage, type Language } from '@/lib/language';
import { buildMetadata } from '@/lib/seo';

const ADMIN_META: Record<Language, { title: string; description: string }> = {
  sr: {
    title: 'KOPEX MIN-LIV | Admin',
    description: 'Administracija sajta KOPEX MIN-LIV.'
  },
  en: {
    title: 'KOPEX MIN-LIV | Admin',
    description: 'KOPEX MIN-LIV site administration.'
  },
  de: {
    title: 'KOPEX MIN-LIV | Admin',
    description: 'Administration der KOPEX MIN-LIV Website.'
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value);
  const meta = ADMIN_META[language];
  return buildMetadata({
    language,
    title: meta.title,
    description: meta.description,
    path: `/admin?lang=${language}`
  });
}

export default function AdminPage() {
  return <AdminHomeClient />;
}
