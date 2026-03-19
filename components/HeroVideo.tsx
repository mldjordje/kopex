'use client';

import { useEffect, useRef, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
type DeviceTarget = 'desktop' | 'mobile';

export default function HeroVideo() {
  const [deviceTarget, setDeviceTarget] = useState<DeviceTarget | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (!deviceTarget) {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    const attemptPlayback = () => {
      video.defaultMuted = true;
      video.muted = true;

      const playPromise = video.play();
      if (playPromise) {
        void playPromise.catch(() => {
          // Some desktop browsers delay autoplay until media is fully ready.
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptPlayback();
      }
    };

    video.load();
    attemptPlayback();
    video.addEventListener('loadeddata', attemptPlayback);
    video.addEventListener('canplay', attemptPlayback);
    window.addEventListener('pageshow', attemptPlayback);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('loadeddata', attemptPlayback);
      video.removeEventListener('canplay', attemptPlayback);
      window.removeEventListener('pageshow', attemptPlayback);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [deviceTarget]);

  const src =
    deviceTarget === 'mobile'
      ? '/hero-video-bg/mobile.mp4'
      : deviceTarget === 'desktop'
        ? '/hero-video-bg/desktop.mp4'
        : '';
  const poster =
    deviceTarget === 'mobile'
      ? '/img/1.jpg'
      : '/img/1.jpg';

  return (
    <video
      ref={videoRef}
      key={src}
      className="kopex-hero-video"
      autoPlay={deviceTarget !== null}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={deviceTarget ? 'auto' : 'none'}
      poster={poster}
      src={deviceTarget ? src : undefined}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
