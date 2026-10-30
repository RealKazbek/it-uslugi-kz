import { describe, expect, it } from 'vitest';
import type { CategoryView } from '@/lib/catalog/localize';
import type { ProductCardDto } from '@/types/api';
import type { ProductOption } from '@/types/lead';
import {
  CONSULTATION_VALUE,
  OTHER_VALUE,
  buildServiceGroups,
  filterServiceGroups,
  normalizeSearch,
  toProductOptions,
} from './serviceOptions';

const LABELS = { consultation: 'Консультация', other: 'Другое' };

const PRODUCTS: ProductOption[] = [
  { slug: 'landing', title: 'Лендинг', category: 'Сайты' },
  { slug: 'shop', title: 'Интернет-магазин', category: 'Сайты' },
  { slug: 'logo', title: 'Логотип', category: 'Дизайн' },
  { slug: 'ёлка', title: 'Ёлочная гирлянда', category: 'Дизайн' },
];

describe('normalizeSearch', () => {
  it('lowercases, folds ё to е and collapses spaces', () => {
    expect(normalizeSearch('  Ёлка   ДЕРЕВО ')).toBe('елка дерево');
  });
});

describe('buildServiceGroups', () => {
  it('puts consultation and other first as pinned rows', () => {
    const [pinned, ...rest] = buildServiceGroups(PRODUCTS, LABELS);
    expect(pinned?.pinned).toBe(true);
    expect(pinned?.options).toEqual([
      { value: CONSULTATION_VALUE, label: 'Консультация' },
      { value: OTHER_VALUE, label: 'Другое' },
    ]);
    expect(rest.map((g) => g.label)).toEqual(['Сайты', 'Дизайн']);
    expect(rest[0]?.options.map((o) => o.value)).toEqual(['landing', 'shop']);
  });

  it('gives no label to products without a category', () => {
    const groups = buildServiceGroups([{ slug: 'x', title: 'X' }], LABELS);
    expect(groups[1]?.label).toBeUndefined();
  });
});

describe('filterServiceGroups', () => {
  const groups = buildServiceGroups(PRODUCTS, LABELS);

  it('returns every group for an empty or blank query', () => {
    expect(filterServiceGroups(groups, '   ')).toBe(groups);
  });

  it('matches titles case-insensitively and drops empty categories', () => {
    const result = filterServiceGroups(groups, 'ЛОГО');
    expect(result.map((g) => g.label)).toEqual([undefined, 'Дизайн']);
    expect(result[1]?.options.map((o) => o.value)).toEqual(['logo']);
  });

  it('treats ё and е as the same letter', () => {
    const result = filterServiceGroups(groups, 'елочная');
    expect(result[1]?.options.map((o) => o.value)).toEqual(['ёлка']);
  });

  it('always keeps the pinned rows', () => {
    const result = filterServiceGroups(groups, 'несуществующее');
    expect(result).toHaveLength(1);
    expect(result[0]?.pinned).toBe(true);
  });
});

describe('toProductOptions', () => {
  const categories: CategoryView[] = [
    { slug: 'design', name: 'Дизайн', short: '', intro: '', productCount: 1 },
    { slug: 'sites', name: 'Сайты', short: '', intro: '', productCount: 2 },
  ];
  const card = (slug: string, category: string): ProductCardDto => ({
    slug,
    category,
    title: slug.toUpperCase(),
    short: '',
    price_from_kzt: 0,
    unit: 'once',
    days_min: 1,
    days_max: 2,
    is_onsite: false,
  });

  it('orders by category sort and uses the localized category name', () => {
    const result = toProductOptions([card('a', 'sites'), card('b', 'design')], categories);
    expect(result).toEqual([
      { slug: 'b', title: 'B', category: 'Дизайн' },
      { slug: 'a', title: 'A', category: 'Сайты' },
    ]);
  });

  it('keeps unknown categories last under their slug', () => {
    const result = toProductOptions([card('c', 'misc'), card('b', 'design')], categories);
    expect(result.map((p) => p.category)).toEqual(['Дизайн', 'misc']);
  });
});
