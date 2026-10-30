import type { SearchDoc, SearchKind } from './types';
import { type Form, matchQuality, QUALITY } from './form';

export interface IndexedDoc {
  doc: SearchDoc;
  title: Form[];
  subtitle: Form[];
  keywords: Form[];
}

/** Each query token is a list of variants (the token plus its synonyms). */
export type QueryTokens = Form[][];

const FIELD_WEIGHT = { title: 10, subtitle: 4, keywords: 2 } as const;
const BONUS = { exactTitleToken: 2, allInTitle: 6, titlePrefix: 3 } as const;
const KIND_BONUS: Record<SearchKind, number> = { product: 0.3, category: 0.2, faq: 0.1, page: 0 };

function bestQuality(variants: Form[], fields: Form[]): number {
  let best = 0;
  for (const variant of variants) {
    for (const field of fields) {
      best = Math.max(best, matchQuality(variant, field));
    }
  }
  return best;
}

function startsTitle(entry: IndexedDoc, query: QueryTokens): boolean {
  const first = query[0];
  const head = entry.title[0];
  if (!first || !head) return false;
  return bestQuality(first, [head]) >= QUALITY.prefix;
}

/** Returns null when some query token matches nothing in the doc (AND semantics). */
export function scoreDoc(entry: IndexedDoc, query: QueryTokens): number | null {
  let score = 0;
  let allInTitle = true;
  let exactTitleTokens = 0;
  for (const variants of query) {
    const inTitle = bestQuality(variants, entry.title);
    const inSubtitle = bestQuality(variants, entry.subtitle);
    const inKeywords = bestQuality(variants, entry.keywords);
    const tokenScore = Math.max(
      inTitle * FIELD_WEIGHT.title,
      inSubtitle * FIELD_WEIGHT.subtitle,
      inKeywords * FIELD_WEIGHT.keywords,
    );
    if (tokenScore === 0) return null;
    if (inTitle === 0) allInTitle = false;
    if (inTitle === QUALITY.exact) exactTitleTokens += 1;
    score += tokenScore;
  }
  score += exactTitleTokens * BONUS.exactTitleToken;
  if (allInTitle) score += BONUS.allInTitle;
  if (startsTitle(entry, query)) score += BONUS.titlePrefix;
  return score + KIND_BONUS[entry.doc.kind];
}
