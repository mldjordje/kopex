'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';

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
    <Box component="form" encType="multipart/form-data" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          id="news-title"
          name="title"
          label="Naslov"
          placeholder="Naslov vesti"
          required
          fullWidth
        />

        <TextField
          id="news-body"
          name="body"
          label="Tekst"
          placeholder="Tekst vesti"
          required
          fullWidth
          multiline
          minRows={5}
        />

        <Stack spacing={1}>
          <Typography variant="subtitle2">Slike (opciono)</Typography>
          <Button variant="outlined" component="label">
            Izaberi slike
            <input id="news-images" name="images" type="file" accept="image/*" multiple hidden />
          </Button>
        </Stack>

        {!hasAdminPassword ? (
          <TextField
            id="news-password"
            name="adminPassword"
            type="password"
            label="Admin lozinka (ako je podesena)"
            placeholder="Admin lozinka"
            fullWidth
          />
        ) : null}

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Cuvanje...' : 'Dodaj vest'}
        </Button>

        {status ? <Alert severity={status.type}>{status.message}</Alert> : null}
      </Stack>
    </Box>
  );
}
