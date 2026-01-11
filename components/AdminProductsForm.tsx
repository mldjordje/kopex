'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

export default function AdminProductsForm({ adminPassword }: { adminPassword?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<StatusState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const hasAdminPassword = Boolean(adminPassword && adminPassword.trim());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set('isActive', isActive ? '1' : '0');
    formData.set('sortOrder', String(sortOrder));

    if (hasAdminPassword) {
      formData.set('adminPassword', adminPassword!.trim());
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload?.message || 'Neuspesno cuvanje proizvoda.'
        });
        return;
      }

      form.reset();
      setIsActive(true);
      setSortOrder(0);
      setStatus({ type: 'success', message: 'Proizvod je sacuvan.' });
      router.refresh();
    } catch (error) {
      console.error('Admin products error:', error);
      setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          id="product-name"
          name="name"
          label="Naziv"
          placeholder="Naziv proizvoda"
          required
          fullWidth
        />

        <TextField
          id="product-slug"
          name="slug"
          label="Slug (SEO)"
          placeholder="naziv-proizvoda"
          helperText="Ako ostavite prazno, slug se generise iz naziva."
          fullWidth
        />

        <TextField
          id="product-category"
          name="category"
          label="Kategorija"
          placeholder="Kategorija"
          fullWidth
        />

        <TextField
          id="product-summary"
          name="summary"
          label="Kratak opis"
          placeholder="Kratak opis proizvoda"
          fullWidth
          multiline
          minRows={2}
        />

        <TextField
          id="product-description"
          name="description"
          label="Opis"
          placeholder="Detaljan opis proizvoda"
          required
          fullWidth
          multiline
          minRows={4}
        />

        <TextField
          id="product-seo-title"
          name="seoTitle"
          label="SEO naslov"
          placeholder="SEO naslov"
          fullWidth
        />

        <TextField
          id="product-seo-description"
          name="seoDescription"
          label="SEO opis"
          placeholder="SEO opis"
          fullWidth
          multiline
          minRows={2}
        />

        <Stack spacing={1}>
          <Typography variant="subtitle2">Hero slika (opciono)</Typography>
          <Button variant="outlined" component="label">
            Izaberi hero sliku
            <input id="product-hero" name="heroImage" type="file" accept="image/*" hidden />
          </Button>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Galerija slika (opciono)</Typography>
          <Button variant="outlined" component="label">
            Izaberi slike
            <input
              id="product-gallery"
              name="galleryImages"
              type="file"
              accept="image/*"
              multiple
              hidden
            />
          </Button>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Dokumenta (opciono)</Typography>
          <Button variant="outlined" component="label">
            Izaberi dokumenta
            <input
              id="product-documents"
              name="documents"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              multiple
              hidden
            />
          </Button>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
              />
            }
            label="Aktivan proizvod"
          />
          <TextField
            id="product-sort-order"
            label="Redosled"
            type="number"
            value={sortOrder}
            onChange={(event) => {
              const parsed = Number(event.target.value);
              setSortOrder(Number.isFinite(parsed) ? parsed : 0);
            }}
            inputProps={{ step: 1 }}
          />
        </Stack>

        {!hasAdminPassword ? (
          <TextField
            id="product-password"
            name="adminPassword"
            type="password"
            label="Admin lozinka (ako je podesena)"
            placeholder="Admin lozinka"
            fullWidth
          />
        ) : null}

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Cuvanje...' : 'Dodaj proizvod'}
        </Button>

        {status ? <Alert severity={status.type}>{status.message}</Alert> : null}
      </Stack>
    </Box>
  );
}
