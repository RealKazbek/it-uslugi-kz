import type { SearchDoc } from '@/lib/search/types';

/** Prefix of the DOM ids of palette rows (aria-activedescendant targets). */
export const ROW_ID_PREFIX = 'search-row';

export function rowIdOf(doc: Pick<SearchDoc, 'id'>): string {
  return `${ROW_ID_PREFIX}-${doc.id}`;
}
