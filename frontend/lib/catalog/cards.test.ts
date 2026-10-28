import { describe, expect, it } from 'vitest';
import { cardView, groupByCategory, type CardView } from './cards';
import { filterGroups, ALL_CATEGORIES } from './filter';

const product = {
  slug: 'lending',
  category: 'websites',
  title: 'Лендинг для бизнеса',
  short: 'Одна страница с заявкой',
  price_from_kzt: 45000,
  unit: 'once' as const,
  days_min: 3,
  days_max: 7,
};

const cards: CardView[] = [
  cardView(product, 'ru', 500),
  cardView({ ...product, slug: 'bot', category: 'bots', title: 'Telegram-бот заявок', short: 'Принимает заявки' }, 'ru', 500),
];

describe('cardView', () => {
  it('builds the localized href and price text', () => {
    expect(cardView(product, 'kk', 500)).toMatchObject({
      href: '/kk/products/lending',
      priceText: expect.stringContaining('бастап'),
    });
    expect(cardView(product, 'en', 500).priceText).toContain('(≈ $90)');
  });
});

describe('groupByCategory', () => {
  it('follows the category order and skips empty categories', () => {
    const groups = groupByCategory(cards, [
      { slug: 'bots', name: 'Боты' },
      { slug: 'ai', name: 'AI' },
      { slug: 'websites', name: 'Сайты' },
    ]);
    expect(groups.map((g) => g.slug)).toEqual(['bots', 'websites']);
    expect(groups[1]?.cards).toHaveLength(1);
  });
});

describe('filterGroups', () => {
  const groups = groupByCategory(cards, [
    { slug: 'websites', name: 'Сайты' },
    { slug: 'bots', name: 'Боты' },
  ]);

  it('returns everything for an empty query and all categories', () => {
    expect(filterGroups(groups, ALL_CATEGORIES, '  ')).toHaveLength(2);
  });

  it('limits the result to one category', () => {
    const result = filterGroups(groups, 'bots', '');
    expect(result.map((g) => g.slug)).toEqual(['bots']);
  });

  it('searches title and short text case-insensitively', () => {
    expect(filterGroups(groups, ALL_CATEGORIES, 'ЗАЯВК').map((g) => g.slug)).toEqual(['websites', 'bots']);
    expect(filterGroups(groups, ALL_CATEGORIES, 'лендинг')[0]?.cards[0]?.slug).toBe('lending');
  });

  it('returns no groups when nothing matches', () => {
    expect(filterGroups(groups, ALL_CATEGORIES, 'zzz')).toEqual([]);
  });
});
