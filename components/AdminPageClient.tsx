'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import AdminGate from '@/components/AdminGate';
import type { NewsItem } from '@/lib/news';

export default function AdminPageClient({
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

          <AdminGate items={items} errorMessage={errorMessage} />
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}
