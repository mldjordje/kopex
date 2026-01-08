'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteStateSync() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    body.classList.add('is-loaded');
    body.classList.remove('is-loading', 'is-unloading');
  }, [pathname]);

  return null;
}
