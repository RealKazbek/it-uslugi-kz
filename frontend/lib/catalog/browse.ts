import type { CardView } from './cards';
import { ALL_CATEGORIES } from './filter';

export const SORTS = ['popular', 'priceAsc', 'priceDesc', 'fast'] as const;
export type SortKey = (typeof SORTS)[number];

export function isSortKey(value: string): value is SortKey {
  return (SORTS as readonly string[]).includes(value);
}

/** Flat catalog filter: one category (or all) and a case-insensitive match on title or short text. */
export function filterCards(cards: CardView[], category: string, query: string): CardView[] {
  const needle = query.trim().toLowerCase();
  return cards.filter(
    (card) =>
      (category === ALL_CATEGORIES || card.category === category) &&
      (needle === '' || card.title.toLowerCase().includes(needle) || card.short.toLowerCase().includes(needle)),
  );
}

/** "popular" keeps the curated backend order; the others sort a copy (stable). */
export function sortCards(cards: CardView[], sort: SortKey): CardView[] {
  const copy = [...cards];
  switch (sort) {
    case 'popular':
      return copy;
    case 'priceAsc':
      return copy.sort((a, b) => a.priceKzt - b.priceKzt);
    case 'priceDesc':
      return copy.sort((a, b) => b.priceKzt - a.priceKzt);
    case 'fast':
      return copy.sort((a, b) => a.daysMax - b.daysMax || a.priceKzt - b.priceKzt);
  }
}
