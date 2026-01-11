'use client';

import { Box, Container, Stack, Typography, Grid, Paper, Alert } from '@mui/material';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import AdminGate from '@/components/AdminGate';
import AdminNav from '@/components/AdminNav';
import AdminNewsForm from '@/components/AdminNewsForm';
import AdminNewsList from '@/components/AdminNewsList';
import type { NewsItem } from '@/lib/news';

export default function AdminNewsPageClient({
  items,
  errorMessage
}: {
  items: NewsItem[];
  errorMessage: string | null;
}) {
  return (
    <MuiThemeProvider>
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack
            spacing={2}
            alignItems="center"
            textAlign="center"
            sx={{ mb: { xs: 4, md: 6 } }}
          >
            <Typography variant="overline" sx={{ letterSpacing: 2 }}>
              Administracija
            </Typography>
            <Typography variant="h3" component="h1">
              Admin vesti
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 680 }}>
              Dodajte nove vesti, azurirajte postojeci sadrzaj i proverite poslednje unose.
            </Typography>
          </Stack>

          <AdminGate>
            {({ adminPassword, onLogout }) => (
              <Stack spacing={3}>
                <AdminNav onLogout={onLogout} />
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
              </Stack>
            )}
          </AdminGate>
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}
