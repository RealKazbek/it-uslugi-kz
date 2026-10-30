import { config } from '@/lib/config';
import type { Lang } from '@/lib/i18n/locales';
import { createSlugIndex, type SlugKind, type SlugPayload } from './slug-index';

/** Sections that exist as a single segment under every language. */
export const SINGLE_SECTIONS = ['catalog', 'prices', 'contacts'] as const;
/** Sections that need a slug (catalog/{category}, products/{slug}, city/{slug}). */
export const SLUG_SECTIONS = ['catalog', 'products', 'city'] as const;

const FETCH_TIMEOUT_MS = 2000;

/** One call for all slug sets. Null when the API cannot be reached or answers badly (the caller fails open). */
async function loadSlugPayload(): Promise<SlugPayload | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(`${config.apiInternalUrl}/api/slugs`, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) {
      console.warn('[routing] slug load failed', { status: response.status });
      return null;
    }
    return (await response.json()) as SlugPayload;
  } catch (cause) {
    console.warn('[routing] slug load failed', { error: cause instanceof Error ? cause.name : 'unknown' });
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const index = createSlugIndex({ load: loadSlugPayload, now: () => Date.now() });

/**
 * True when the path under a language segment has no page, decided before routing so the request gets a real
 * 404. Unknown API answers are not treated as missing (the request is served: fail open).
 *
 * Accepted window: a product deleted less than 60 s ago (the index TTL) is still served from memory. Its page then
 * renders Next's default 404 shell (status 404, no server-rendered text).
 */
export async function isMissingPage(lang: Lang, rest: string): Promise<boolean> {
  const parts = rest.split('/').filter(Boolean);
  if (parts.length === 0) return false;
  const [section, slug, extra] = parts;
  if (extra !== undefined) return true;
  if (parts.length === 1) {
    return !(SINGLE_SECTIONS as readonly string[]).includes(section ?? '');
  }
  if (!(SLUG_SECTIONS as readonly string[]).includes(section ?? '')) return true;
  if (section === 'city' && lang === 'en') return true;
  const kind: SlugKind = section === 'catalog' ? 'categories' : section === 'products' ? 'products' : 'cities';
  return (await index.isKnown(kind, slug ?? '')) === false;
}
