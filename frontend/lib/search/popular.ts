import type { SearchIndex } from './index';
import type { SearchDoc } from './types';

/** The highest-weight product docs, for the empty state. Pure; order follows weight, then the index order. */
export function popularProducts(index: SearchIndex, limit: number): SearchDoc[] {
  return index.docs
    .map((entry) => entry.doc)
    .filter((doc) => doc.kind === 'product')
    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
    .slice(0, Math.max(0, limit));
}
