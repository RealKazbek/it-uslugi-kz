import type { Lang } from '@/lib/i18n/locales';

export type SearchKind = 'product' | 'category' | 'faq' | 'page';

/** One searchable entity, already localised for `lang`. Built server-side by the search-index route. */
export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  /** Category title for products and FAQ group title for FAQ entries. */
  subtitle?: string;
  href: string;
  /** Starting price in KZT, products only. */
  priceFrom?: number;
  /** Extra searchable text: short description, tags, and the titles in the other two languages. */
  keywords: string;
  /** Higher = shown first among equal scores (popular products). */
  weight?: number;
}

export interface SearchIndexPayload {
  lang: Lang;
  docs: SearchDoc[];
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
}
