'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MuiThemeProvider from '@/components/MuiThemeProvider';
import type { NewsItem } from '@/lib/news';
import { getLanguageLocale, normalizeLanguage, type Language } from '@/lib/language';

const formatDate = (value: string, language: Language): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(getLanguageLocale(language), {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const getSerbianPlural = (count: number, one: string, few: string, many: string): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return few;
  }
  return many;
};

const getImageCountLabel = (language: Language, count: number): string => {
  switch (language) {
    case 'en':
      return `${count} ${count === 1 ? 'image' : 'images'}`;
    case 'de':
      return `${count} ${count === 1 ? 'Bild' : 'Bilder'}`;
    default:
      return `${count} ${getSerbianPlural(count, 'slika', 'slike', 'slika')}`;
  }
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

const CARD_SIZES = '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 50vw';

export default function NewsPageClient({
  items,
  errorMessage
}: {
  items: NewsItem[];
  errorMessage: string | null;
}) {
  const searchParams = useSearchParams();
  const currentLanguage = normalizeLanguage(
    searchParams.get('lang') ?? (typeof document !== 'undefined' ? document.documentElement.lang : undefined)
  );
  const labels: Record<Language, {
    title: string;
    subtitle: string;
    empty: string;
    readMore: string;
    noImage: string;
  }> = {
    sr: {
      title: 'Vesti / Karijera',
      subtitle: 'Najnovije informacije, objave i oglasi za posao iz Kopex MIN-LIV.',
      empty: 'Trenutno nema objavljenih vesti ili oglasa.',
      readMore: 'Pro\u010ditaj vi\u0161e',
      noImage: 'Bez naslovne slike'
    },
    en: {
      title: 'News / Careers',
      subtitle: 'Latest updates, announcements, and job openings from Kopex MIN-LIV.',
      empty: 'There are currently no published news items or job ads.',
      readMore: 'Read more',
      noImage: 'No cover image'
    },
    de: {
      title: 'News / Karriere',
      subtitle: 'Aktuelle Informationen, Meldungen und Stellenangebote von Kopex MIN-LIV.',
      empty: 'Derzeit sind keine News oder Stellenangebote verf\u00fcgbar.',
      readMore: 'Mehr lesen',
      noImage: 'Kein Titelbild'
    }
  };

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
              {labels[currentLanguage].title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 720 }}>
              {labels[currentLanguage].subtitle}
            </Typography>
          </Stack>

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          {!errorMessage && items.length === 0 ? (
            <Alert severity="info">{labels[currentLanguage].empty}</Alert>
          ) : null}

          {!errorMessage && items.length > 0 ? (
          <Grid container spacing={3}>
            {items.map((item) => {
              const [cover] = item.images;
              return (
                <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3
                      }}
                    >
                      {cover ? (
                        <Box sx={{ position: 'relative', height: 220, lineHeight: 0 }}>
                          <Image
                            src={cover}
                            alt={item.title}
                            fill
                            sizes={CARD_SIZES}
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
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
                            {labels[currentLanguage].noImage}
                          </Typography>
                        </Box>
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <Chip size="small" label={formatDate(item.createdAt, currentLanguage)} />
                          {item.images.length > 1 ? (
                            <Chip
                              size="small"
                              variant="outlined"
                              label={getImageCountLabel(currentLanguage, item.images.length)}
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
                        className="bringer-noanim-link"
                        component={Link}
                        href={`/news/${item.id}`}
                        variant="contained"
                        color="primary"
                      >
                          {labels[currentLanguage].readMore}
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
