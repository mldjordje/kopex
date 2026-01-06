'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsItem } from '@/lib/news';

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

type DraftState = Record<number, { title: string; body: string }>;

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('sr-RS', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export default function AdminNewsList({
  items,
  adminPassword
}: {
  items: NewsItem[];
  adminPassword?: string;
}) {
  const router = useRouter();
  const [localPassword, setLocalPassword] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<DraftState>({});
  const [status, setStatus] = useState<StatusState>(null);
  const [isWorking, setIsWorking] = useState(false);
  const hasAdminPassword = Boolean(adminPassword && adminPassword.trim());
  const effectivePassword = hasAdminPassword ? adminPassword!.trim() : localPassword.trim();

  useEffect(() => {
    const nextDrafts: DraftState = {};
    items.forEach((item) => {
      nextDrafts[item.id] = { title: item.title, body: item.body };
    });
    setDrafts(nextDrafts);
  }, [items]);

  const sortedItems = useMemo(() => items.slice(), [items]);

  const updateDraft = (id: number, field: 'title' | 'body', value: string) => {
    setDrafts((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [field]: value
      }
    }));
  };

  const handleCancel = (id: number) => {
    const original = items.find((item) => item.id === id);
    if (original) {
      setDrafts((current) => ({
        ...current,
        [id]: { title: original.title, body: original.body }
      }));
    }
    setEditingId(null);
  };

  const handleSave = async (id: number) => {
    const draft = drafts[id];
    if (!draft?.title?.trim() || !draft?.body?.trim()) {
      setStatus({ type: 'error', message: 'Unesite naslov i tekst.' });
      return;
    }

    setIsWorking(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('title', draft.title.trim());
    formData.append('body', draft.body.trim());
    formData.append('adminPassword', effectivePassword);

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PATCH',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Neuspesno azuriranje vesti.'
        });
        return;
      }

      setStatus({ type: 'success', message: 'Vest je azurirana.' });
      setEditingId(null);
      router.refresh();
    } catch (error) {
      console.error('Admin news update error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsWorking(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Obrisati ovu vest?')) {
      return;
    }

    setIsWorking(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('adminPassword', effectivePassword);

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Neuspesno brisanje vesti.'
        });
        return;
      }

      setStatus({ type: 'success', message: 'Vest je obrisana.' });
      if (editingId === id) {
        setEditingId(null);
      }
      router.refresh();
    } catch (error) {
      console.error('Admin news delete error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsWorking(false);
    }
  };

  if (!sortedItems.length) {
    return (
      <div className="bringer-block">
        <p>Jos uvek nema vesti u bazi.</p>
      </div>
    );
  }

  return (
    <div className="bringer-block">
      {!hasAdminPassword ? (
        <div className="bringer-form-content">
          <label htmlFor="admin-list-password">Admin lozinka</label>
          <input
            id="admin-list-password"
            name="adminPassword"
            type="password"
            placeholder="Admin lozinka"
            value={localPassword}
            onChange={(event) => setLocalPassword(event.target.value)}
          />
        </div>
      ) : null}

      {status ? (
        <div className="bringer-contact-form__response admin-status">{status.message}</div>
      ) : null}

      <ul className="bringer-detailed-list">
        {sortedItems.map((item) => {
          const isEditing = editingId === item.id;
          const preview = item.body.replace(/\s+/g, ' ').trim();
          const snippet = preview.length > 180 ? `${preview.slice(0, 180)}...` : preview;
          const draft = drafts[item.id] || { title: item.title, body: item.body };

          return (
            <li key={item.id}>
              <div className="bringer-detailed-list-title">
                {isEditing ? (
                  <input
                    name={`title-${item.id}`}
                    type="text"
                    value={draft.title}
                    onChange={(event) => updateDraft(item.id, 'title', event.target.value)}
                  />
                ) : (
                  <h4>
                    {item.title}
                    <span className="bringer-accent">.</span>
                  </h4>
                )}
              </div>
              <div className="bringer-detailed-list-description">
                <p>{formatDate(item.createdAt)}</p>
                {isEditing ? (
                  <textarea
                    name={`body-${item.id}`}
                    value={draft.body}
                    onChange={(event) => updateDraft(item.id, 'body', event.target.value)}
                  />
                ) : (
                  <p>{snippet}</p>
                )}
                <p>{item.images.length} slika</p>
              </div>
              <div className="admin-news-actions">
                {isEditing ? (
                  <>
                    <button type="button" onClick={() => handleSave(item.id)} disabled={isWorking}>
                      Sacuvaj
                    </button>
                    <button type="button" onClick={() => handleCancel(item.id)} disabled={isWorking}>
                      Odustani
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingId(item.id)}
                    disabled={isWorking}
                  >
                    Izmeni
                  </button>
                )}
                <button type="button" onClick={() => handleDelete(item.id)} disabled={isWorking}>
                  Obrisi
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
