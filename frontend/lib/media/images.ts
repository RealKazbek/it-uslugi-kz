// Local stock photos in public/media (Unsplash licence, see public/media/CREDITS.md). Every
// product and category has a file; unknown slugs fall back to the category or a generic image.

const FALLBACK = '/media/categories/websites.webp';
const CATEGORIES = new Set([
  'websites', 'ecommerce', 'bots', 'ai', 'automation', 'seo-maps', 'support', 'education', 'apps', 'devops', 'onsite', 'design',
]);
/** Per-photo focal point (CSS object-position) where the default centre crop cuts the subject. */
const FOCUS: Record<string, string> = {
  'amocrm-nastroika': '50% 70%',
  'crm-dlya-malogo-biznesa': '50% 60%',
  'lechenie-ot-vzloma': '50% 55%',
  'telegram-mini-app': '50% 40%',
  'podgotovka-k-zashite': '70% 50%',
  'pomosh-s-kursami': '35% 40%',
  'repetitor-programmirovaniya': '50% 35%',
};
const SLUG = /^[a-z0-9-]+$/;

export const heroImages = {
  desk: '/media/hero/desk.webp',
  city: '/media/hero/city.webp',
  phone: '/media/hero/phone.webp',
} as const;

export function categoryImage(category: string, variant: 1 | 2 = 1): string {
  if (!CATEGORIES.has(category)) return FALLBACK;
  return `/media/categories/${category}${variant === 2 ? '-2' : ''}.webp`;
}

/** Main photo of a product. Slugs come from the backend, so they are checked before use in a path. */
export function productImage(slug: string): string {
  return SLUG.test(slug) ? `/media/products/${slug}.webp` : FALLBACK;
}

/** Product page gallery: the product photo, then the two category photos. */
export function productGallery(slug: string, category: string): string[] {
  return [productImage(slug), categoryImage(category, 1), categoryImage(category, 2)];
}

/** object-position for a product photo path ('50% 50%' when the centre crop is fine). */
export function imagePosition(src: string): string {
  const slug = src.split('/').pop()?.replace('.webp', '') ?? '';
  return FOCUS[slug] ?? '50% 50%';
}
