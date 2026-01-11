'use client';

import { useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

type AdminGateProps = {
  children: (payload: { adminPassword: string; onLogout: () => void }) => React.ReactNode;
};

const STORAGE_KEY = 'kopex-admin-password';

export default function AdminGate({ children }: AdminGateProps) {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [status, setStatus] = useState<StatusState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const attemptLogin = async (password: string, options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false;

    if (!password.trim()) {
      if (!silent) {
        setStatus({ type: 'error', message: 'Unesite admin lozinku.' });
      }
      return false;
    }

    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('password', password.trim());

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        body: formData
      });

      const payload = await response
        .json()
        .catch(() => ({ message: 'Neuspesan odgovor sa servera.' }));

      if (!response.ok) {
        if (!silent) {
          setStatus({
            type: 'error',
            message: payload?.message || 'Pogresna lozinka.'
          });
        }
        sessionStorage.removeItem(STORAGE_KEY);
        return false;
      }

      sessionStorage.setItem(STORAGE_KEY, password.trim());
      setIsAuthed(true);
      setStatus(null);
      return true;
    } catch (error) {
      console.error('Admin login error:', error);
      if (!silent) {
        setStatus({ type: 'error', message: 'Greska u mrezi ili serveru.' });
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAdminPassword(stored);
      void attemptLogin(stored, { silent: true });
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void attemptLogin(adminPassword);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminPassword('');
    setIsAuthed(false);
    setStatus(null);
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

  return <>{children({ adminPassword: adminPassword.trim(), onLogout: handleLogout })}</>;
}
