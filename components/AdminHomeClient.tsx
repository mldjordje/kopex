'use client';

import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import AdminGate from '@/components/AdminGate';
import AdminNav from '@/components/AdminNav';

export default function AdminHomeClient() {
  return (
    <MuiThemeProvider>
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
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
              Admin panel
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 680 }}>
              Izaberite sekciju za uredjivanje sadrzaja sajta.
            </Typography>
          </Stack>

          <AdminGate>
            {({ onLogout }) => (
              <Stack spacing={3}>
                <AdminNav onLogout={onLogout} />
                <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6">Vesti</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dodavanje, izmena i brisanje objava u sekciji vesti.
                    </Typography>
                    <Button component={Link} href="/admin/news" variant="contained">
                      Upravljaj vestima
                    </Button>
                  </Stack>
                </Paper>

                <Paper sx={{ p: { xs: 3, md: 4 }, boxShadow: 3 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6">Proizvodi</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upravljanje proizvodima, slikama, dokumentima i SEO poljima.
                    </Typography>
                    <Button component={Link} href="/admin/products" variant="contained">
                      Upravljaj proizvodima
                    </Button>
                  </Stack>
                </Paper>
              </Stack>
            )}
          </AdminGate>
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}
