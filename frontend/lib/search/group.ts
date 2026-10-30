import type { SearchHit, SearchKind } from './types';

export interface SearchGroup {
  kind: SearchKind;
  hits: SearchHit[];
}

const KIND_ORDER: readonly SearchKind[] = ['product', 'category', 'faq', 'page'];

/** Splits hits by kind in fixed order; drops empty groups. Keeps the incoming hit order within a group. */
export function groupHits(hits: SearchHit[], perGroup: number = Number.POSITIVE_INFINITY): SearchGroup[] {
  return KIND_ORDER.map((kind) => ({
    kind,
    hits: hits.filter((hit) => hit.doc.kind === kind).slice(0, perGroup),
  })).filter((group) => group.hits.length > 0);
}
