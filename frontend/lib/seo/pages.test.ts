import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CategoryDto, CityDto, ProductCardDto } from '@/types/api';

vi.mock('@/lib/api/categories', () => ({ getCategories: vi.fn() }));
vi.mock('@/lib/api/products', () => ({ getProducts: vi.fn() }));
vi.mock('@/lib/api/cities', () => ({ getCities: vi.fn() }));

import { getCategories } from '@/lib/api/categories';
import { getCities } from '@/lib/api/cities';
import { getProducts } from '@/lib/api/products';
import { listPages } from './pages';

const cat = (slug: string, count: number): CategoryDto => ({ slug, product_count: count, sort: 0, name_ru: '', name_kk: '', name_en: '', short_ru: '', short_kk: '', short_en: '', intro_ru: '', intro_kk: '', intro_en: '' });
const prod = (slug: string): ProductCardDto => ({ slug, category: 'websites', title: '', short: '', price_from_kzt: 1, unit: 'once', days_min: 1, days_max: 1 });
const city = (slug: string): CityDto => ({ slug, name: slug } as unknown as CityDto);

beforeEach(() => {
  vi.mocked(getCategories).mockResolvedValue([cat('websites', 2), cat('empty', 0)]);
  vi.mocked(getProducts).mockResolvedValue([prod('lending')]);
  vi.mocked(getCities).mockResolvedValue([city('almaty')]);
});

describe('listPages', () => {
  it('lists the fixed pages in all languages, categories with products, products, and cities in ru and kk only', async () => {
    const pages = await listPages();
    const paths = pages.map((p) => p.path);
    expect(paths).toEqual(
      expect.arrayContaining(['/', '/catalog', '/prices', '/contacts', '/catalog/websites', '/products/lending', '/city/almaty']),
    );
    expect(paths).not.toContain('/catalog/empty');
    const city = pages.find((p) => p.path === '/city/almaty');
    expect(city?.langs).toEqual(['ru', 'kk']);
    const home = pages.find((p) => p.path === '/');
    expect(home?.langs).toEqual(['ru', 'kk', 'en']);
  });
});
