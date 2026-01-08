'use client';

import { useEffect, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
type DeviceTarget = 'desktop' | 'mobile';

export default function HeroVideo() {
  const [deviceTarget, setDeviceTarget] = useState<DeviceTarget | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateTarget = (matches: boolean) => {
      setDeviceTarget(matches ? 'mobile' : 'desktop');
    };
    const handleChange = (event: MediaQueryListEvent) => {
      updateTarget(event.matches);
    };

    updateTarget(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const src =
    deviceTarget === 'mobile'
      ? '/hero-video-bg/mobile.mp4'
      : deviceTarget === 'desktop'
        ? '/hero-video-bg/desktop.mp4'
        : '';
  const poster =
    deviceTarget === 'mobile'
      ? '/img/kopex/production-02.jpg'
      : '/img/kopex/facility-front.jpg';

  return (
    <video
      key={src}
      className="kopex-hero-video"
      autoPlay={deviceTarget !== null}
      muted
      loop
      playsInline
      preload={deviceTarget ? 'auto' : 'none'}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      {deviceTarget ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
