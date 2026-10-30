import { describe, expect, it } from 'vitest';
import mediaLoader from './loader';

describe('mediaLoader', () => {
  it('picks the smallest variant at least as wide as requested', () => {
    expect(mediaLoader({ src: '/media/products/lending.webp', width: 384 })).toBe('/media/products/lending-384.webp');
    expect(mediaLoader({ src: '/media/products/lending.webp', width: 500 })).toBe('/media/products/lending-640.webp');
    expect(mediaLoader({ src: '/portfolio/car.webp', width: 256 })).toBe('/portfolio/car-256.webp');
  });

  it('uses the source file above the largest variant and leaves other URLs alone', () => {
    expect(mediaLoader({ src: '/media/hero/desk.webp', width: 1200 })).toBe('/media/hero/desk.webp');
    expect(mediaLoader({ src: '/favicon.svg', width: 64 })).toBe('/favicon.svg');
  });
});
