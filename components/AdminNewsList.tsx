'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, Chip, Paper, Stack, TextField, Typography } from '@mui/material';
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
    return <Alert severity="info">Jos uvek nema vesti u bazi.</Alert>;
  }

  return (
    <Stack spacing={2}>
      {!hasAdminPassword ? (
        <TextField
          id="admin-list-password"
          name="adminPassword"
          type="password"
          label="Admin lozinka"
          placeholder="Admin lozinka"
          value={localPassword}
          onChange={(event) => setLocalPassword(event.target.value)}
          helperText="Unesite lozinku da biste mogli da menjate ili brisete vesti."
          fullWidth
        />
      ) : null}

      {status ? <Alert severity={status.type}>{status.message}</Alert> : null}

      {sortedItems.map((item) => {
        const isEditing = editingId === item.id;
        const preview = item.body.replace(/\s+/g, ' ').trim();
        const snippet = preview.length > 180 ? `${preview.slice(0, 180)}...` : preview;
        const draft = drafts[item.id] || { title: item.title, body: item.body };

        return (
          <Paper key={item.id} variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
              >
                {isEditing ? (
                  <TextField
                    name={`title-${item.id}`}
                    label="Naslov"
                    value={draft.title}
                    onChange={(event) => updateDraft(item.id, 'title', event.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography variant="h6">{item.title}</Typography>
                )}
                <Stack direction="row" spacing={1}>
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => handleSave(item.id)}
                        disabled={isWorking}
                      >
                        Sacuvaj
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => handleCancel(item.id)}
                        disabled={isWorking}
                      >
                        Odustani
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => setEditingId(item.id)}
                      disabled={isWorking}
                    >
                      Izmeni
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                    disabled={isWorking}
                  >
                    Obrisi
                  </Button>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Chip size="small" label={formatDate(item.createdAt)} />
                <Chip size="small" variant="outlined" label={`${item.images.length} slika`} />
              </Stack>

              {isEditing ? (
                <TextField
                  name={`body-${item.id}`}
                  label="Tekst"
                  value={draft.body}
                  onChange={(event) => updateDraft(item.id, 'body', event.target.value)}
                  fullWidth
                  multiline
                  minRows={4}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {snippet}
                </Typography>
              )}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
