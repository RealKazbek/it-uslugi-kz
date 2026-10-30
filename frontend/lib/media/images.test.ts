import { describe, expect, it } from 'vitest';
import { categoryImage, imagePosition, productGallery, productImage } from './images';

describe('media images', () => {
  it('builds product and category paths', () => {
    expect(productImage('lending')).toBe('/media/products/lending.webp');
    expect(categoryImage('bots', 2)).toBe('/media/categories/bots-2.webp');
  });

  it('falls back for unknown or unsafe slugs', () => {
    expect(categoryImage('nope')).toBe('/media/categories/websites.webp');
    expect(productImage('../etc')).toBe('/media/categories/websites.webp');
  });

  it('gives every category its own photo', () => {
    for (const c of ['apps', 'devops', 'onsite', 'design']) {
      expect(categoryImage(c)).toBe(`/media/categories/${c}.webp`);
    }
  });

  it('uses a focal point only for photos that need one', () => {
    expect(imagePosition('/media/products/podgotovka-k-zashite.webp')).toBe('70% 50%');
    expect(imagePosition('/media/products/lending.webp')).toBe('50% 50%');
  });

  it('returns a three-image gallery', () => {
    expect(productGallery('lending', 'websites')).toHaveLength(3);
  });
});
