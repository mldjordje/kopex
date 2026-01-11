'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type { ProductItem } from '@/lib/products';

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

type DraftState = Record<
  number,
  {
    name: string;
    slug: string;
    category: string;
    summary: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    isActive: boolean;
    sortOrder: number;
  }
>;

type ClearState = Record<number, { hero: boolean; gallery: boolean; documents: boolean }>;

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

export default function AdminProductsList({
  items,
  adminPassword
}: {
  items: ProductItem[];
  adminPassword?: string;
}) {
  const router = useRouter();
  const [localPassword, setLocalPassword] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<DraftState>({});
  const [clearFlags, setClearFlags] = useState<ClearState>({});
  const [status, setStatus] = useState<StatusState>(null);
  const [isWorking, setIsWorking] = useState(false);
  const heroInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const galleryInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const documentInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const hasAdminPassword = Boolean(adminPassword && adminPassword.trim());
  const effectivePassword = hasAdminPassword ? adminPassword!.trim() : localPassword.trim();

  useEffect(() => {
    const nextDrafts: DraftState = {};
    const nextFlags: ClearState = {};
    items.forEach((item) => {
      nextDrafts[item.id] = {
        name: item.name,
        slug: item.slug,
        category: item.category || '',
        summary: item.summary || '',
        description: item.description || '',
        seoTitle: item.seoTitle || '',
        seoDescription: item.seoDescription || '',
        isActive: item.isActive,
        sortOrder: item.sortOrder
      };
      nextFlags[item.id] = { hero: false, gallery: false, documents: false };
    });
    setDrafts(nextDrafts);
    setClearFlags(nextFlags);
  }, [items]);

  const sortedItems = useMemo(() => items.slice(), [items]);

  const updateDraft = <K extends keyof DraftState[number]>(
    id: number,
    field: K,
    value: DraftState[number][K]
  ) => {
    setDrafts((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [field]: value
      }
    }));
  };

  const updateClearFlag = (id: number, field: keyof ClearState[number], value: boolean) => {
    setClearFlags((current) => ({
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
        [id]: {
          name: original.name,
          slug: original.slug,
          category: original.category || '',
          summary: original.summary || '',
          description: original.description || '',
          seoTitle: original.seoTitle || '',
          seoDescription: original.seoDescription || '',
          isActive: original.isActive,
          sortOrder: original.sortOrder
        }
      }));
      setClearFlags((current) => ({
        ...current,
        [id]: { hero: false, gallery: false, documents: false }
      }));
    }
    setEditingId(null);
  };

  const handleSave = async (id: number) => {
    const draft = drafts[id];
    if (!draft?.name?.trim() || !draft?.description?.trim()) {
      setStatus({ type: 'error', message: 'Unesite naziv i opis proizvoda.' });
      return;
    }

    setIsWorking(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('name', draft.name.trim());
    formData.append('slug', draft.slug.trim());
    formData.append('category', draft.category.trim());
    formData.append('summary', draft.summary.trim());
    formData.append('description', draft.description.trim());
    formData.append('seoTitle', draft.seoTitle.trim());
    formData.append('seoDescription', draft.seoDescription.trim());
    formData.append('isActive', draft.isActive ? '1' : '0');
    formData.append('sortOrder', String(draft.sortOrder));
    formData.append('adminPassword', effectivePassword);

    const flags = clearFlags[id];
    if (flags?.hero) {
      formData.append('clearHero', '1');
    }
    if (flags?.gallery) {
      formData.append('clearGallery', '1');
    }
    if (flags?.documents) {
      formData.append('clearDocuments', '1');
    }

    const heroInput = heroInputRefs.current[id];
    if (heroInput?.files?.length) {
      formData.append('heroImage', heroInput.files[0]);
    }

    const galleryInput = galleryInputRefs.current[id];
    if (galleryInput?.files?.length) {
      Array.from(galleryInput.files).forEach((file) => {
        formData.append('galleryImages', file, file.name);
      });
    }

    const documentInput = documentInputRefs.current[id];
    if (documentInput?.files?.length) {
      Array.from(documentInput.files).forEach((file) => {
        formData.append('documents', file, file.name);
      });
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Neuspesno azuriranje proizvoda.'
        });
        return;
      }

      setStatus({ type: 'success', message: 'Proizvod je azuriran.' });
      setEditingId(null);
      if (heroInput) {
        heroInput.value = '';
      }
      if (galleryInput) {
        galleryInput.value = '';
      }
      if (documentInput) {
        documentInput.value = '';
      }
      router.refresh();
    } catch (error) {
      console.error('Admin products update error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsWorking(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Obrisati ovaj proizvod?')) {
      return;
    }

    setIsWorking(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('adminPassword', effectivePassword);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Neuspesno brisanje proizvoda.'
        });
        return;
      }

      setStatus({ type: 'success', message: 'Proizvod je obrisan.' });
      if (editingId === id) {
        setEditingId(null);
      }
      router.refresh();
    } catch (error) {
      console.error('Admin products delete error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsWorking(false);
    }
  };

  if (!sortedItems.length) {
    return <Alert severity="info">Jos uvek nema proizvoda u bazi.</Alert>;
  }

  return (
    <Stack spacing={2}>
      {!hasAdminPassword ? (
        <TextField
          id="admin-products-password"
          name="adminPassword"
          type="password"
          label="Admin lozinka"
          placeholder="Admin lozinka"
          value={localPassword}
          onChange={(event) => setLocalPassword(event.target.value)}
          helperText="Unesite lozinku da biste mogli da menjate ili brisete proizvode."
          fullWidth
        />
      ) : null}

      {status ? <Alert severity={status.type}>{status.message}</Alert> : null}

      {sortedItems.map((item) => {
        const isEditing = editingId === item.id;
        const draft = drafts[item.id] || {
          name: item.name,
          slug: item.slug,
          category: item.category || '',
          summary: item.summary || '',
          description: item.description || '',
          seoTitle: item.seoTitle || '',
          seoDescription: item.seoDescription || '',
          isActive: item.isActive,
          sortOrder: item.sortOrder
        };
        const flags = clearFlags[item.id] || { hero: false, gallery: false, documents: false };

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
                    name={`name-${item.id}`}
                    label="Naziv"
                    value={draft.name}
                    onChange={(event) => updateDraft(item.id, 'name', event.target.value)}
                    fullWidth
                  />
                ) : (
                  <Typography variant="h6">{item.name}</Typography>
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

              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Chip size="small" label={formatDate(item.createdAt)} />
                <Chip size="small" label={item.isActive ? 'Aktivan' : 'Neaktivan'} />
                <Chip size="small" variant="outlined" label={`Hero: ${item.heroImage ? 'da' : 'ne'}`} />
                <Chip size="small" variant="outlined" label={`Galerija: ${item.gallery.length}`} />
                <Chip size="small" variant="outlined" label={`Dokumenti: ${item.documents.length}`} />
                {item.category ? (
                  <Chip size="small" variant="outlined" label={`Kategorija: ${item.category}`} />
                ) : null}
              </Stack>

              {isEditing ? (
                <Stack spacing={2}>
                  <TextField
                    name={`slug-${item.id}`}
                    label="Slug"
                    value={draft.slug}
                    onChange={(event) => updateDraft(item.id, 'slug', event.target.value)}
                    helperText="Ako ostavite prazno, slug se generise iz naziva."
                    fullWidth
                  />

                  <TextField
                    name={`category-${item.id}`}
                    label="Kategorija"
                    value={draft.category}
                    onChange={(event) => updateDraft(item.id, 'category', event.target.value)}
                    fullWidth
                  />

                  <TextField
                    name={`summary-${item.id}`}
                    label="Kratak opis"
                    value={draft.summary}
                    onChange={(event) => updateDraft(item.id, 'summary', event.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                  />

                  <TextField
                    name={`description-${item.id}`}
                    label="Opis"
                    value={draft.description}
                    onChange={(event) => updateDraft(item.id, 'description', event.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                  />

                  <TextField
                    name={`seo-title-${item.id}`}
                    label="SEO naslov"
                    value={draft.seoTitle}
                    onChange={(event) => updateDraft(item.id, 'seoTitle', event.target.value)}
                    fullWidth
                  />

                  <TextField
                    name={`seo-description-${item.id}`}
                    label="SEO opis"
                    value={draft.seoDescription}
                    onChange={(event) => updateDraft(item.id, 'seoDescription', event.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={draft.isActive}
                          onChange={(event) => updateDraft(item.id, 'isActive', event.target.checked)}
                        />
                      }
                      label="Aktivan proizvod"
                    />
                    <TextField
                      name={`sort-order-${item.id}`}
                      label="Redosled"
                      type="number"
                      value={draft.sortOrder}
                      onChange={(event) => {
                        const parsed = Number(event.target.value);
                        updateDraft(item.id, 'sortOrder', Number.isFinite(parsed) ? parsed : 0);
                      }}
                      inputProps={{ step: 1 }}
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Nova hero slika (opciono)</Typography>
                    <Button variant="outlined" component="label">
                      Izaberi hero sliku
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={(node) => {
                          heroInputRefs.current[item.id] = node;
                        }}
                      />
                    </Button>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={flags.hero}
                          onChange={(event) => updateClearFlag(item.id, 'hero', event.target.checked)}
                        />
                      }
                      label="Ukloni postojecu hero sliku"
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Dodaj slike u galeriju</Typography>
                    <Button variant="outlined" component="label">
                      Izaberi slike
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        ref={(node) => {
                          galleryInputRefs.current[item.id] = node;
                        }}
                      />
                    </Button>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={flags.gallery}
                          onChange={(event) => updateClearFlag(item.id, 'gallery', event.target.checked)}
                        />
                      }
                      label="Zameni postojecu galeriju"
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Dodaj dokumenta</Typography>
                    <Button variant="outlined" component="label">
                      Izaberi dokumenta
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        multiple
                        hidden
                        ref={(node) => {
                          documentInputRefs.current[item.id] = node;
                        }}
                      />
                    </Button>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={flags.documents}
                          onChange={(event) => updateClearFlag(item.id, 'documents', event.target.checked)}
                        />
                      }
                      label="Zameni postojeca dokumenta"
                    />
                  </Stack>
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {item.summary || item.description || 'Bez opisa.'}
                </Typography>
              )}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
