import { describe, expect, it } from 'vitest';
import { categoryImage, productGallery, productImage } from './images';

describe('media images', () => {
  it('builds product and category paths', () => {
    expect(productImage('lending')).toBe('/media/products/lending.webp');
    expect(categoryImage('bots', 2)).toBe('/media/categories/bots-2.webp');
  });

  it('falls back for unknown or unsafe slugs', () => {
    expect(categoryImage('nope')).toBe('/media/categories/websites.webp');
    expect(productImage('../etc')).toBe('/media/categories/websites.webp');
  });

  it('returns a three-image gallery', () => {
    expect(productGallery('lending', 'websites')).toHaveLength(3);
  });
});
