import { describe, expect, it } from 'vitest';
import { filterCards, isSortKey, sortCards } from './browse';
import { cardView } from './cards';
import { ALL_CATEGORIES } from './filter';

const base = { slug: 'lending', category: 'websites', title: 'Лендинг', short: 'Одна страница с заявкой', price_from_kzt: 45000, unit: 'once' as const, days_min: 3, days_max: 7 };
const cards = [
  cardView(base, 'ru', 500),
  cardView({ ...base, slug: 'bot', category: 'bots', title: 'Telegram-бот', short: 'Принимает заявки', price_from_kzt: 30000, days_max: 3 }, 'ru', 500),
  cardView({ ...base, slug: 'shop', category: 'ecommerce', title: 'Магазин', short: 'Каталог', price_from_kzt: 90000, days_max: 14 }, 'ru', 500),
];

describe('filterCards', () => {
  it('filters by category and query', () => {
    expect(filterCards(cards, 'bots', '')).toHaveLength(1);
    expect(filterCards(cards, ALL_CATEGORIES, 'ЗАЯВК').map((c) => c.slug)).toEqual(['lending', 'bot']);
    expect(filterCards(cards, 'websites', 'бот')).toEqual([]);
  });
});

describe('sortCards', () => {
  it('sorts by price and timeline without mutating the input', () => {
    expect(sortCards(cards, 'priceAsc').map((c) => c.slug)).toEqual(['bot', 'lending', 'shop']);
    expect(sortCards(cards, 'priceDesc')[0]?.slug).toBe('shop');
    expect(sortCards(cards, 'fast')[0]?.slug).toBe('bot');
    expect(sortCards(cards, 'popular').map((c) => c.slug)).toEqual(['lending', 'bot', 'shop']);
    expect(cards[0]?.slug).toBe('lending');
  });

  it('validates sort keys', () => {
    expect(isSortKey('priceAsc')).toBe(true);
    expect(isSortKey('random')).toBe(false);
  });
});

describe('cardView', () => {
  it('carries image, price and timeline', () => {
    expect(cards[0]).toMatchObject({ image: '/media/products/lending.webp', priceKzt: 45000, daysMax: 7 });
    expect(cards[0]?.timelineText).toContain('3–7');
  });
});
