'use client';

import { useRef, type ReactNode } from 'react';

type ProductSliderProps = {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
  trackLabel: string;
};

const scrollByAmount = (element: HTMLDivElement | null, direction: 'prev' | 'next') => {
  if (!element) {
    return;
  }
  const amount = element.clientWidth * 0.9;
  element.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
};

export default function ProductSlider({ children, prevLabel, nextLabel, trackLabel }: ProductSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="kopex-product-slider">
      <div className="kopex-product-slider__nav">
        <button
          type="button"
          className="kopex-product-slider__button"
          aria-label={prevLabel}
          onClick={() => scrollByAmount(trackRef.current, 'prev')}
        >
          ‹
        </button>
        <button
          type="button"
          className="kopex-product-slider__button"
          aria-label={nextLabel}
          onClick={() => scrollByAmount(trackRef.current, 'next')}
        >
          ›
        </button>
      </div>
      <div className="kopex-product-slider__track" ref={trackRef} role="list" aria-label={trackLabel}>
        {children}
      </div>
    </div>
  );
}
