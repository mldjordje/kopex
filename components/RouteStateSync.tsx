'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RouteStateSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  useEffect(() => {
    const body = document.body;
    body.classList.add('is-loaded');
    body.classList.remove('is-loading', 'is-unloading');

    document.querySelectorAll<HTMLElement>('[data-appear]').forEach((element) => {
      element.classList.add('in-view');
    });
  }, [pathname, searchKey]);

  return null;
}
