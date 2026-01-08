'use client';

import { useState } from 'react';
import { Alert, Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
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
      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5">Admin prijava</Typography>
              <Box component="form" onSubmit={handleLogin}>
                <Stack spacing={2}>
                  <TextField
                    id="admin-login-password"
                    name="password"
                    type="password"
                    label="Admin lozinka"
                    placeholder="Admin lozinka"
                    value={adminPassword}
                    onChange={(event) => setAdminPassword(event.target.value)}
                    required
                    fullWidth
                  />
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Prijavljivanje...' : 'Prijavi se'}
                  </Button>
                  {status ? <Alert severity={status.type}>{status.message}</Alert> : null}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Nova vest</Typography>
            <AdminNewsForm adminPassword={adminPassword} />
          </Stack>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Poslednje vesti</Typography>
            {errorMessage ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              <AdminNewsList items={items} adminPassword={adminPassword} />
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
