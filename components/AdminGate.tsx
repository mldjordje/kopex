'use client';

import { useState } from 'react';
import AdminNewsForm from '@/components/AdminNewsForm';
import AdminNewsList from '@/components/AdminNewsList';
import type { NewsItem } from '@/lib/news';

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

export default function AdminGate({
  items,
  errorMessage
}: {
  items: NewsItem[];
  errorMessage: string | null;
}) {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!adminPassword.trim()) {
      setStatus({ type: 'error', message: 'Unesite admin lozinku.' });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('password', adminPassword.trim());

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Pogresna lozinka.'
        });
        return;
      }

      setIsAuthed(true);
      setStatus(null);
    } catch (error) {
      console.error('Admin login error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthed) {
    return (
      <div className="stg-row stg-large-gap">
        <div className="stg-col-6 stg-tp-col-12">
          <h3>Admin prijava</h3>
          <form className="bringer-contact-form bringer-block" onSubmit={handleLogin}>
            <div className="bringer-form-content">
              <label htmlFor="admin-login-password">Admin lozinka</label>
              <input
                id="admin-login-password"
                name="password"
                type="password"
                placeholder="Admin lozinka"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                required
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Prijavljivanje...' : 'Prijavi se'}
              </button>

              {status ? (
                <div className="bringer-contact-form__response admin-status">
                  {status.message}
                </div>
              ) : null}
            </div>
            <span className="bringer-form-spinner"></span>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="stg-row stg-large-gap">
      <div className="stg-col-6 stg-tp-col-12 stg-tp-bottom-gap">
        <h3>Nova vest</h3>
        <AdminNewsForm adminPassword={adminPassword} />
      </div>
      <div className="stg-col-6 stg-tp-col-12">
        <h3>Poslednje vesti</h3>
        {errorMessage ? (
          <div className="bringer-block">
            <p>{errorMessage}</p>
          </div>
        ) : (
          <AdminNewsList items={items} adminPassword={adminPassword} />
        )}
      </div>
    </div>
  );
}
