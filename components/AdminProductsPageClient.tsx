'use client';

import { Alert, Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import AdminGate from '@/components/AdminGate';
import AdminNav from '@/components/AdminNav';
import AdminProductsForm from '@/components/AdminProductsForm';
import AdminProductsList from '@/components/AdminProductsList';
import type { ProductItem } from '@/lib/products';

export default function AdminProductsPageClient({
  items,
  errorMessage
}: {
  items: ProductItem[];
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
              Admin proizvodi
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 680 }}>
              Dodajte nove proizvode, slike i dokumenta, uz kontrolu SEO polja i statusa.
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
                        <Typography variant="h6">Novi proizvod</Typography>
                        <AdminProductsForm adminPassword={adminPassword} />
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3 }}>
                      <Stack spacing={2}>
                        <Typography variant="h6">Postojeci proizvodi</Typography>
                        {errorMessage ? (
                          <Alert severity="error">{errorMessage}</Alert>
                        ) : (
                          <AdminProductsList items={items} adminPassword={adminPassword} />
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
