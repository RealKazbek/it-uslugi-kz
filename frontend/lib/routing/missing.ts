import { config } from '@/lib/config';
import type { Lang } from '@/lib/i18n/locales';
import { createSlugIndex, type SlugKind } from './slug-index';

/** Top-level sections that exist under every language segment. */
export const SECTIONS = ['catalog', 'products', 'city', 'prices', 'portfolio', 'contacts'] as const;

const FETCH_TIMEOUT_MS = 2000;

async function getJson(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(`${config.apiInternalUrl}${path}`, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${path}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

/** Current slugs for a kind, or null when the API cannot be reached (the caller fails open). */
async function loadSlugs(kind: SlugKind): Promise<string[] | null> {
  try {
    if (kind === 'products') {
      const list = (await getJson('/api/products?lang=ru')) as { slug: string }[];
      return list.map((p) => p.slug);
    }
    if (kind === 'cities') {
      const list = (await getJson('/api/cities?lang=ru')) as { slug: string }[];
      return list.map((c) => c.slug);
    }
    const list = (await getJson('/api/categories')) as { slug: string; product_count: number }[];
    return list.filter((c) => c.product_count > 0).map((c) => c.slug);
  } catch (cause) {
    console.warn('[routing] slug index load failed', { kind, error: cause instanceof Error ? cause.name : 'unknown' });
    return null;
  }
}

const index = createSlugIndex({
  load: loadSlugs,
  now: () => Date.now(),
  onFailure: (kind, message) => console.warn('[routing] slug index', { kind, message }),
});

/**
 * True when the path under a language segment has no page. Decided before routing so the request gets a real
 * 404. Slugs come from the in-memory index (no call per request). If the API is unreachable, the page is
 * not treated as missing, so the request is served by Next (fail open).
 */
export async function isMissingPage(lang: Lang, rest: string): Promise<boolean> {
  const parts = rest.split('/').filter(Boolean);
  if (parts.length === 0) return false;
  const [section, slug, extra] = parts;
  if (!(SECTIONS as readonly string[]).includes(section ?? '') || extra !== undefined) return true;
  if (parts.length === 1) return false;
  if (section === 'catalog') return (await index.isKnown('categories', slug ?? '')) === false;
  if (section === 'products') return (await index.isKnown('products', slug ?? '')) === false;
  if (section === 'city') {
    if (lang === 'en') return true;
    return (await index.isKnown('cities', slug ?? '')) === false;
  }
  return true;
}
