import type { CardGroup } from './cards';

export const ALL_CATEGORIES = 'all';

/** Keeps groups of the chosen category and cards whose title or short text contains the query. */
export function filterGroups(groups: CardGroup[], category: string, query: string): CardGroup[] {
  const needle = query.trim().toLowerCase();
  return groups
    .filter((group) => category === ALL_CATEGORIES || group.slug === category)
    .map((group) => ({
      ...group,
      cards: group.cards.filter(
        (card) =>
          needle === '' ||
          card.title.toLowerCase().includes(needle) ||
          card.short.toLowerCase().includes(needle),
      ),
    }))
    .filter((group) => group.cards.length > 0);
}
