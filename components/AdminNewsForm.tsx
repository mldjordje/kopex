'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

export default function AdminNewsForm({ adminPassword }: { adminPassword?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasAdminPassword = Boolean(adminPassword && adminPassword.trim());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (hasAdminPassword) {
      formData.set('adminPassword', adminPassword!.trim());
    }

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Neuspesno cuvanje vesti.'
        });
        return;
      }

      form.reset();
      setStatus({ type: 'success', message: 'Vest je sacuvana.' });
      router.refresh();
    } catch (error) {
      console.error('Admin news error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="bringer-contact-form bringer-block"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="bringer-form-content">
        <label htmlFor="news-title">Naslov</label>
        <input id="news-title" name="title" type="text" placeholder="Naslov vesti" required />

        <label htmlFor="news-body">Tekst</label>
        <textarea id="news-body" name="body" placeholder="Tekst vesti" required></textarea>

        <label htmlFor="news-images">Slike (opciono)</label>
        <input id="news-images" name="images" type="file" accept="image/*" multiple />

        {!hasAdminPassword ? (
          <>
            <label htmlFor="news-password">Admin lozinka (ako je podesena)</label>
            <input id="news-password" name="adminPassword" type="password" placeholder="Admin lozinka" />
          </>
        ) : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cuvanje...' : 'Dodaj vest'}
        </button>

        {status ? (
          <div className="bringer-contact-form__response admin-status">{status.message}</div>
        ) : null}
      </div>
      <span className="bringer-form-spinner"></span>
    </form>
  );
}
