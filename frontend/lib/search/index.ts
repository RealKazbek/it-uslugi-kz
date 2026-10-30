import type { SearchDoc, SearchHit, SearchKind } from './types';
import type { IndexedDoc } from './score';
import { scoreDoc } from './score';
import { buildQuery, prepareDoc } from './prepare';

export { normalize } from './normalize';
export { toLatin, toCyrillic } from './translit';
export { groupHits, type SearchGroup } from './group';
export type { SearchDoc, SearchHit, SearchKind } from './types';

export interface SearchIndex {
  docs: IndexedDoc[];
}

export interface SearchOptions {
  limit?: number;
  kinds?: SearchKind[];
}

const DEFAULT_LIMIT = 20;

export function buildIndex(docs: SearchDoc[]): SearchIndex {
  return { docs: docs.map(prepareDoc) };
}

function compareHits(a: SearchHit, b: SearchHit): number {
  return b.score - a.score || (b.doc.weight ?? 0) - (a.doc.weight ?? 0);
}

export function search(index: SearchIndex, query: string, opts: SearchOptions = {}): SearchHit[] {
  const tokens = buildQuery(query);
  if (tokens.length === 0) return [];
  const kinds = opts.kinds ? new Set<SearchKind>(opts.kinds) : null;
  const hits: SearchHit[] = [];
  for (const entry of index.docs) {
    if (kinds && !kinds.has(entry.doc.kind)) continue;
    const score = scoreDoc(entry, tokens);
    if (score !== null) hits.push({ doc: entry.doc, score });
  }
  hits.sort(compareHits);
  return hits.slice(0, Math.max(0, opts.limit ?? DEFAULT_LIMIT));
}
