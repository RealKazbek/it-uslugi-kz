import { config } from '@/lib/config';
import type { Lang } from '@/lib/i18n/locales';

/** Top-level sections that exist under every language segment. */
export const SECTIONS = ['catalog', 'products', 'city', 'prices', 'portfolio', 'contacts'] as const;

/** Only city pages exist in ru and kk. */
function cityExists(lang: Lang): boolean {
  return lang !== 'en';
}

async function apiStatus(path: string): Promise<number | null> {
  try {
    const response = await fetch(`${config.apiInternalUrl}${path}`, { cache: 'no-store' });
    return response.status;
  } catch {
    return null;
  }
}

async function categoryHasProducts(slug: string): Promise<boolean | null> {
  try {
    const response = await fetch(`${config.apiInternalUrl}/api/categories`, { cache: 'no-store' });
    if (!response.ok) return null;
    const list = (await response.json()) as { slug: string; product_count: number }[];
    return list.some((c) => c.slug === slug && c.product_count > 0);
  } catch {
    return null;
  }
}

/**
 * True when the path under a language segment has no page. Decided before routing so the
 * request gets a real 404 (a notFound() thrown inside a page cannot be rendered as HTML).
 * Unknown API answers are not treated as missing: the page then decides.
 */
export async function isMissingPage(lang: Lang, rest: string): Promise<boolean> {
  const parts = rest.split('/').filter(Boolean);
  if (parts.length === 0) return false;
  const [section, slug, extra] = parts;
  if (!(SECTIONS as readonly string[]).includes(section ?? '') || extra !== undefined) return true;
  if (parts.length === 1) return false;
  if (section === 'catalog') return (await categoryHasProducts(slug ?? '')) === false;
  if (section === 'products') return (await apiStatus(`/api/products/${slug}?lang=${lang}`)) === 404;
  if (section === 'city') {
    if (!cityExists(lang)) return true;
    return (await apiStatus(`/api/cities/${slug}?lang=${lang}`)) === 404;
  }
  return true;
}
