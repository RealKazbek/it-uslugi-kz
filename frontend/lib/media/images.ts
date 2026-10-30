// Local stock photos in public/media (Unsplash licence, see public/media/CREDITS.md). Every
// product and category has a file; unknown slugs fall back to the category or a generic image.

const FALLBACK = '/media/categories/websites.webp';
const CATEGORIES = new Set(['websites', 'ecommerce', 'bots', 'ai', 'automation', 'seo-maps', 'support', 'education']);
/** Categories without their own photo reuse a related one. */
const CATEGORY_PHOTO: Record<string, string> = { apps: 'bots', devops: 'support', onsite: 'automation', design: 'websites' };
const SLUG = /^[a-z0-9-]+$/;

export const heroImages = {
  desk: '/media/hero/desk.webp',
  city: '/media/hero/city.webp',
  phone: '/media/hero/phone.webp',
} as const;

export function categoryImage(category: string, variant: 1 | 2 = 1): string {
  const photo = CATEGORY_PHOTO[category] ?? category;
  if (!CATEGORIES.has(photo)) return FALLBACK;
  return `/media/categories/${photo}${variant === 2 ? '-2' : ''}.webp`;
}

/** Main photo of a product. Slugs come from the backend, so they are checked before use in a path. */
export function productImage(slug: string): string {
  return SLUG.test(slug) ? `/media/products/${slug}.webp` : FALLBACK;
}

/** Product page gallery: the product photo, then the two category photos. */
export function productGallery(slug: string, category: string): string[] {
  return [productImage(slug), categoryImage(category, 1), categoryImage(category, 2)];
}
