'use client';

import { Alert, Box, Button, Chip, Container, Divider, Stack, Typography } from '@mui/material';
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

export default function NewsDetailClient({
  item,
  errorMessage
}: {
  item: NewsItem | null;
  errorMessage?: string | null;
}) {
  const [cover, ...gallery] = item?.images || [];

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
                Nazad na vesti
              </Button>
            </div>

            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

            {item ? (
              <Stack spacing={1}>
                <Typography variant="h3" component="h1">
                  {item.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip size="small" label={formatDate(item.createdAt)} />
                  {item.images.length > 0 ? (
                    <Chip size="small" variant="outlined" label={`${item.images.length} slika`} />
                  ) : null}
                </Stack>
              </Stack>
            ) : (
              <Typography variant="h4" component="h1">
                Vest nije pronadjena
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
                <Box
                  component="img"
                  src={cover}
                  alt={item?.title ?? 'Vest'}
                  loading="lazy"
                  sx={{ width: '100%', maxHeight: 420, objectFit: 'cover' }}
                />
              </Box>
            ) : null}

            {item ? <Divider /> : null}

            {item ? <Stack spacing={2}>{renderParagraphs(item.body)}</Stack> : null}

            {gallery.length > 0 ? (
              <Stack spacing={2}>
                <Typography variant="h6" component="h2">
                  Galerija
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
                      <Box
                        component="img"
                        src={image}
                        alt={`${item?.title ?? 'Vest'} ${index + 2}`}
                        loading="lazy"
                        sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                      />
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
