'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import Link from 'next/link';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import type { NewsItem } from '@/lib/news';

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

const getSnippet = (body: string): string => {
  const block = body
    .split(/\n+/)
    .map((item) => item.trim())
    .find(Boolean);
  const preview = (block || body).replace(/\s+/g, ' ').trim();
  if (preview.length <= 220) {
    return preview;
  }
  return `${preview.slice(0, 220)}...`;
};

export default function NewsPageClient({
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
              Kopex MIN-LIV
            </Typography>
            <Typography variant="h3" component="h1">
              Vesti
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 720 }}>
              Najnovije informacije i objave iz Kopex MIN-LIV, sa pregledom najbitnijih
              novosti.
            </Typography>
          </Stack>

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          {!errorMessage && items.length === 0 ? (
            <Alert severity="info">Trenutno nema objavljenih vesti.</Alert>
          ) : null}

          {!errorMessage && items.length > 0 ? (
            <Grid container spacing={3}>
              {items.map((item) => {
                const [cover] = item.images;
                return (
                  <Grid item xs={12} md={6} key={item.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3
                      }}
                    >
                      {cover ? (
                        <CardMedia component="img" height="220" image={cover} alt={item.title} />
                      ) : (
                        <Box
                          sx={{
                            height: 220,
                            bgcolor: 'rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Typography variant="subtitle2" color="text.secondary">
                            Bez naslovne slike
                          </Typography>
                        </Box>
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <Chip size="small" label={formatDate(item.createdAt)} />
                          {item.images.length > 1 ? (
                            <Chip
                              size="small"
                              variant="outlined"
                              label={`${item.images.length} slika`}
                            />
                          ) : null}
                        </Stack>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getSnippet(item.body)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button
                          component={Link}
                          href={`/news/${item.id}`}
                          variant="contained"
                          color="primary"
                        >
                          Procitaj vise
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : null}
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}
