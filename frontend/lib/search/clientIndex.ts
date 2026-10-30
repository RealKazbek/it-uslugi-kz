import { fetchSearchPayload } from '@/lib/api/searchIndex';
import type { Lang } from '@/lib/i18n/locales';
import { buildIndex, type SearchIndex } from './index';

/** One in-memory index per language, built once. A failed load is dropped so the next open retries. */
const cache = new Map<Lang, Promise<SearchIndex>>();

export function loadClientIndex(lang: Lang): Promise<SearchIndex> {
  const cached = cache.get(lang);
  if (cached) return cached;
  const pending = fetchSearchPayload(lang)
    .then((payload) => buildIndex(payload.docs))
    .catch((cause: unknown) => {
      cache.delete(lang);
      console.error('[search] index load failed', { lang, error: cause instanceof Error ? cause.message : 'unknown' });
      throw cause;
    });
  cache.set(lang, pending);
  return pending;
}
