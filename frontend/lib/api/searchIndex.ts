import type { Lang } from '@/lib/i18n/locales';
import type { SearchIndexPayload } from '@/lib/search/types';

/** Client-side fetch of the prebuilt search docs. Throws on any non-2xx answer; callers decide how to show it. */
export async function fetchSearchPayload(lang: Lang): Promise<SearchIndexPayload> {
  const response = await fetch(`/api/search-index?lang=${lang}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`search index request failed with status ${response.status}`);
  }
  return (await response.json()) as SearchIndexPayload;
}
