'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Stack } from '@mui/material';

const getVariant = (pathname: string, href: string) =>
  pathname === href ? 'contained' : 'outlined';

export default function AdminNav({ onLogout }: { onLogout?: () => void }) {
  const pathname = usePathname();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
      justifyContent="center"
      sx={{ flexWrap: 'wrap' }}
    >
      <Button component={Link} href="/admin" variant={getVariant(pathname, '/admin')}>
        Admin
      </Button>
      <Button component={Link} href="/admin/products" variant={getVariant(pathname, '/admin/products')}>
        Proizvodi
      </Button>
      <Button component={Link} href="/admin/news" variant={getVariant(pathname, '/admin/news')}>
        Vesti
      </Button>
      {onLogout ? (
        <Button color="inherit" onClick={onLogout}>
          Odjavi se
        </Button>
      ) : null}
    </Stack>
  );
}
