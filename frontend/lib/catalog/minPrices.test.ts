import { describe, expect, it } from 'vitest';
import type { CardView } from './cards';
import type { CategoryView } from './localize';
import { priceRows } from './minPrices';

const category = (slug: string, productCount: number): CategoryView => ({
  slug,
  name: slug,
  short: '',
  intro: '',
  productCount,
});

const card = (slug: string, category: string, priceKzt: number): CardView =>
  ({ slug, category, priceKzt }) as CardView;

describe('priceRows', () => {
  it('uses the cheapest product of each category and skips empty categories', () => {
    const categories = [category('websites', 2), category('bots', 1), category('ai', 0)];
    const cards = [card('a', 'websites', 90000), card('b', 'websites', 45000), card('c', 'bots', 30000), card('d', 'ai', 1)];
    const rows = priceRows(categories, cards, 'ru', 500);
    expect(rows.map((row) => row.slug)).toEqual(['websites', 'bots']);
    expect(rows[0]?.count).toBe(2);
    expect(rows[0]?.priceText).toContain('45');
    expect(rows[0]?.priceText).not.toContain('90');
  });

  it('returns no rows without products', () => {
    expect(priceRows([category('bots', 1)], [], 'en', 500)).toEqual([]);
  });
});
