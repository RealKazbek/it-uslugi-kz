'use client';

import { useMemo } from 'react';
import { groupHits, search, type SearchGroup, type SearchIndex } from '@/lib/search/index';
import type { SearchDoc } from '@/lib/search/types';
import { useDebouncedValue } from './useDebouncedValue';

export const SEARCH_DEBOUNCE_MS = 150;
/** Hits kept from the engine before grouping. */
const HIT_LIMIT = 30;
/** Rows shown per group in the palette. */
export const PALETTE_PER_GROUP = 5;

export interface SearchResults {
  groups: SearchGroup[];
  /** Visible docs in display order (drives keyboard navigation). */
  docs: SearchDoc[];
}

/** Engine results for the debounced query. Empty query or no index gives no groups. */
export function useSearchResults(index: SearchIndex | null, query: string): SearchResults {
  const debounced = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);
  return useMemo(() => {
    if (index === null || debounced === '') return { groups: [], docs: [] };
    const groups = groupHits(search(index, debounced, { limit: HIT_LIMIT }), PALETTE_PER_GROUP);
    const docs = groups.flatMap((group) => group.hits.map((hit) => hit.doc));
    return { groups, docs };
  }, [index, debounced]);
}
