'use client';

import { useEffect, useRef, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const PLAYBACK_RETRY_DELAYS = [0, 250, 1000, 2500];
type DeviceTarget = 'desktop' | 'mobile';
type PlaybackState = 'idle' | 'playing' | 'fallback';

export default function HeroVideo() {
  const [deviceTarget, setDeviceTarget] = useState<DeviceTarget | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
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

    let cancelled = false;
    let retryIndex = 0;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    setPlaybackState('idle');

    const clearRetry = () => {
      if (retryTimeout !== null) {
        clearTimeout(retryTimeout);
        retryTimeout = null;
      }
    };

    const primeVideoElement = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', 'true');
    };

    const markFallback = () => {
      if (cancelled) {
        return;
      }
      clearRetry();
      setPlaybackState('fallback');
    };

    const markPlaying = () => {
      if (cancelled) {
        return;
      }
      clearRetry();
      setPlaybackState('playing');
    };

    const queueRetry = () => {
      if (cancelled || retryTimeout !== null) {
        return;
      }

      const delay = PLAYBACK_RETRY_DELAYS[retryIndex];
      if (delay === undefined) {
        markFallback();
        return;
      }

      retryIndex += 1;
      retryTimeout = setTimeout(() => {
        retryTimeout = null;
        attemptPlayback();
      }, delay);
    };

    const attemptPlayback = () => {
      if (cancelled || document.visibilityState === 'hidden') {
        return;
      }

      primeVideoElement();
      const playPromise = video.play();
      if (playPromise) {
        void playPromise
          .then(() => {
            retryIndex = 0;
            markPlaying();
          })
          .catch(() => {
            if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
              queueRetry();
              return;
            }

            // Autoplay can be blocked by browser policy or unsupported codecs.
            markFallback();
          });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptPlayback();
      }
    };

    const handlePause = () => {
      if (!video.ended && document.visibilityState === 'visible') {
        queueRetry();
      }
    };

    const handleUserInteraction = () => {
      if (video.paused) {
        attemptPlayback();
      }
    };

    const handleError = () => {
      markFallback();
    };

    primeVideoElement();
    video.load();
    attemptPlayback();
    video.addEventListener('playing', markPlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', attemptPlayback);
    video.addEventListener('loadedmetadata', attemptPlayback);
    video.addEventListener('canplay', attemptPlayback);
    video.addEventListener('error', handleError);
    window.addEventListener('pageshow', attemptPlayback);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('pointerdown', handleUserInteraction, true);
    document.addEventListener('keydown', handleUserInteraction, true);

    return () => {
      cancelled = true;
      clearRetry();
      video.removeEventListener('playing', markPlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', attemptPlayback);
      video.removeEventListener('loadedmetadata', attemptPlayback);
      video.removeEventListener('canplay', attemptPlayback);
      video.removeEventListener('error', handleError);
      window.removeEventListener('pageshow', attemptPlayback);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('pointerdown', handleUserInteraction, true);
      document.removeEventListener('keydown', handleUserInteraction, true);
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
    <div
      className={`kopex-hero-video-shell ${playbackState === 'playing' ? 'is-playing' : ''} ${playbackState === 'fallback' ? 'is-fallback' : ''}`.trim()}
      style={{ backgroundImage: `url(${poster})` }}
    >
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
    </div>
  );
}
