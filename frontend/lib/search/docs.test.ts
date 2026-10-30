import { describe, expect, it } from 'vitest';
import type { CategoryView } from '@/lib/catalog/localize';
import type { ProductCardDto } from '@/types/api';
import { categoryDocs, pageDocs } from './staticDocs';
import { faqDocs } from './faqDocs';
import { productDocs } from './productDocs';

const product = (slug: string, title: string, overrides: Partial<ProductCardDto> = {}): ProductCardDto => ({
  slug,
  category: 'websites',
  title,
  short: `${title} short`,
  price_from_kzt: 45000,
  unit: 'once',
  days_min: 3,
  days_max: 7,
  is_onsite: false,
  ...overrides,
});

const categories: CategoryView[] = [
  { slug: 'websites', name: 'Сайты', short: 'Сайты под ключ', intro: '', productCount: 2 },
  { slug: 'empty', name: 'Пусто', short: '', intro: '', productCount: 0 },
];

describe('productDocs', () => {
  const ru = [product('landing', 'Лендинг'), product('shop', 'Магазин', { price_from_kzt: 120000 })];
  const kk = [product('landing', 'Лендинг KK'), product('shop', 'Дүкен')];
  const en = [product('landing', 'Landing page'), product('shop', 'Online shop')];

  it('builds localised rows with the category as subtitle and the price', () => {
    const docs = productDocs('ru', ru, [kk, en], categories);
    expect(docs[1]).toMatchObject({
      id: 'product:shop',
      kind: 'product',
      title: 'Магазин',
      subtitle: 'Сайты',
      href: '/products/shop',
      priceFrom: 120000,
    });
  });

  it('puts the titles of the other languages into keywords', () => {
    const [landing] = productDocs('ru', ru, [kk, en], categories);
    expect(landing?.keywords).toContain('Landing page');
    expect(landing?.keywords).toContain('Лендинг KK');
    expect(landing?.keywords).toContain('Лендинг short');
  });

  it('prefixes non-default languages in href and weights earlier products higher', () => {
    const docs = productDocs('en', en, [ru, kk], categories);
    expect(docs[0]?.href).toBe('/en/products/landing');
    expect((docs[0]?.weight ?? 0) > (docs[1]?.weight ?? 0)).toBe(true);
  });

  it('falls back to the slug when the category is unknown', () => {
    const [doc] = productDocs('ru', [product('x', 'X', { category: 'gone' })], [], categories);
    expect(doc?.subtitle).toBe('gone');
  });
});

describe('categoryDocs', () => {
  it('skips categories without active products and keeps other-language names as keywords', () => {
    const docs = categoryDocs('ru', categories, { websites: ['Websites'] });
    expect(docs.map((d) => d.id)).toEqual(['category:websites']);
    expect(docs[0]).toMatchObject({ kind: 'category', href: '/catalog/websites', title: 'Сайты' });
    expect(docs[0]?.keywords).toContain('Websites');
  });
});

describe('pageDocs', () => {
  it('lists reviews only when reviews exist', () => {
    const without = pageDocs('ru', false).map((d) => d.id);
    const withReviews = pageDocs('ru', true).map((d) => d.id);
    expect(without).not.toContain('page:reviews');
    expect(withReviews).toContain('page:reviews');
  });

  it('uses prefixed hrefs for kk', () => {
    const prices = pageDocs('kk', false).find((d) => d.id === 'page:prices');
    expect(prices?.href).toBe('/kk/prices');
  });
});

describe('faqDocs', () => {
  it('links each item to its anchor on the FAQ page and trims long answers', () => {
    const docs = faqDocs('ru');
    expect(docs.length).toBeGreaterThan(0);
    const first = docs[0];
    expect(first?.kind).toBe('faq');
    expect(first?.href).toMatch(/^\/faq#.+/);
    expect(docs.every((d) => d.keywords.length <= 300)).toBe(true);
  });
});
