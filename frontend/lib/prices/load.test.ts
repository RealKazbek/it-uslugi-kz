import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CategoryDto, ProductCardDto } from '@/types/api';

vi.mock('@/lib/api/categories', () => ({ getCategories: vi.fn() }));
vi.mock('@/lib/api/products', () => ({ getProducts: vi.fn(), getProduct: vi.fn() }));

import { getCategories } from '@/lib/api/categories';
import { getProduct, getProducts } from '@/lib/api/products';
import { loadPrices, priceRow } from './load';

const category = (slug: string, sort: number): CategoryDto => ({
  slug,
  sort,
  name_ru: slug,
  name_kk: slug,
  name_en: slug,
  short_ru: '',
  short_kk: '',
  short_en: '',
  intro_ru: '',
  intro_kk: '',
  intro_en: '',
  product_count: 1,
});

const card = (slug: string, cat: string, unit: ProductCardDto['unit'], price: number): ProductCardDto => ({
  slug,
  category: cat,
  title: `Title ${slug}`,
  short: '',
  price_from_kzt: price,
  unit,
  days_min: 2,
  days_max: 4,
});

beforeEach(() => {
  vi.mocked(getCategories).mockResolvedValue([category('bots', 2), category('websites', 1)]);
  vi.mocked(getProducts).mockResolvedValue([card('lending', 'websites', 'once', 45000), card('bot', 'bots', 'month', 30000)]);
  vi.mocked(getProduct).mockClear();
});

describe('loadPrices', () => {
  it('groups products by category in category order, using only the list endpoint', async () => {
    const data = await loadPrices('en');
    expect(data.groups.map((g) => g.slug)).toEqual(['websites', 'bots']);
    expect(data.productCount).toBe(2);
    expect(getProduct).not.toHaveBeenCalled();
  });

  it('shows the price without the unit, and the unit once in the format column', async () => {
    const data = await loadPrices('en');
    const row = data.groups[0]?.rows[0];
    expect(row?.price).toBe('from 45,000 ₸ (≈ $90)');
    expect(row?.format).toBe('one-off');
    expect(row?.timeline).toBe('timeline: 2–4 working days');
    expect(data.groups[1]?.rows[0]?.format).toBe('per month');
    expect(data.groups[1]?.rows[0]?.timeline).toBe('start within 2 working days');
  });

  it('builds the minimum price text from the cheapest product', async () => {
    const data = await loadPrices('ru');
    expect(data.minText).toBe('от 30 000 ₸');
  });
});

describe('priceRow', () => {
  it('links to the localized product page', () => {
    expect(priceRow('kk', card('lending', 'websites', 'once', 45000), 500).href).toBe('/kk/products/lending');
  });
});
