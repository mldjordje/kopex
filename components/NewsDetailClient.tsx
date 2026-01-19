'use client';

import { Alert, Box, Button, Chip, Container, Divider, Stack, Typography } from '@mui/material';
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

const renderParagraphs = (body: string) => {
  return body
    .split(/\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => (
      <Typography key={`${block}-${index}`} variant="body1" color="text.primary">
        {block}
      </Typography>
    ));
};

const COVER_SIZES = '(max-width: 900px) 100vw, 900px';
const GALLERY_SIZES = '(max-width: 600px) 100vw, 50vw';

export default function NewsDetailClient({
  item,
  errorMessage
}: {
  item: NewsItem | null;
  errorMessage?: string | null;
}) {
  const [cover, ...gallery] = item?.images || [];
  const searchParams = useSearchParams();
  const currentLanguage = normalizeLanguage(
    searchParams.get('lang') ?? (typeof document !== 'undefined' ? document.documentElement.lang : undefined)
  );
  const labels: Record<Language, {
    back: string;
    notFound: string;
    gallery: string;
    imageAltFallback: string;
  }> = {
    sr: {
      back: 'Nazad na vesti / karijeru',
      notFound: 'Vest nije prona\u0111ena',
      gallery: 'Galerija',
      imageAltFallback: 'Vest'
    },
    en: {
      back: 'Back to news / careers',
      notFound: 'News item not found',
      gallery: 'Gallery',
      imageAltFallback: 'News'
    },
    de: {
      back: 'Zur\u00fcck zu News / Karriere',
      notFound: 'Nachricht nicht gefunden',
      gallery: 'Galerie',
      imageAltFallback: 'Nachricht'
    }
  };

  return (
    <MuiThemeProvider>
      <Box sx={{ py: { xs: 5, md: 9 } }}>
        <Container maxWidth="md">
          <Stack spacing={3}>
            <div>
              <Button
                className="bringer-noanim-link"
                component={Link}
                href="/news"
                variant="text"
              >
                {labels[currentLanguage].back}
              </Button>
            </div>

            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

            {item ? (
              <Stack spacing={1}>
                <Typography variant="h3" component="h1">
                  {item.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={formatDate(item.createdAt, currentLanguage)} />
                  {item.images.length > 0 ? (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={getImageCountLabel(currentLanguage, item.images.length)}
                    />
                  ) : null}
                </Stack>
              </Stack>
            ) : (
              <Typography variant="h4" component="h1">
                {labels[currentLanguage].notFound}
              </Typography>
            )}

            {cover ? (
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 3,
                  lineHeight: 0
                }}
              >
                <Box sx={{ position: 'relative', height: { xs: 240, sm: 420 }, lineHeight: 0 }}>
                  <Image
                    src={cover}
                    alt={item?.title ?? labels[currentLanguage].imageAltFallback}
                    fill
                    sizes={COVER_SIZES}
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Box>
            ) : null}

            {item ? <Divider /> : null}

            {item ? <Stack spacing={2}>{renderParagraphs(item.body)}</Stack> : null}

            {gallery.length > 0 ? (
              <Stack spacing={2}>
                <Typography variant="h6" component="h2">
                  {labels[currentLanguage].gallery}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }
                  }}
                >
                  {gallery.map((image, index) => (
                    <Box
                      key={`${item?.id ?? 'news'}-gallery-${index}`}
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 2,
                        lineHeight: 0
                      }}
                    >
                      <Box sx={{ position: 'relative', height: 240, lineHeight: 0 }}>
                        <Image
                          src={image}
                          alt={`${item?.title ?? labels[currentLanguage].imageAltFallback} ${index + 2}`}
                          fill
                          sizes={GALLERY_SIZES}
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Stack>
            ) : null}
          </Stack>
        </Container>
      </Box>
    </MuiThemeProvider>
  );
}
