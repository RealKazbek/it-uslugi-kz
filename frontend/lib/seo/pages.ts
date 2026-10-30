import { getCategories } from '@/lib/api/categories';
import { getCities } from '@/lib/api/cities';
import { getProducts } from '@/lib/api/products';
import { LANGS, type Lang } from '@/lib/i18n/locales';

export interface PageRef {
  path: string;
  langs: readonly Lang[];
}

const CITY_LANGS = ['ru', 'kk'] as const;

/** Every indexable page with the languages it exists in. Server only; uses the cached API client. */
export async function listPages(): Promise<PageRef[]> {
  const perLang = await Promise.all(
    LANGS.map(async (lang) => {
      const [categories, products] = await Promise.all([getCategories(), getProducts(lang)]);
      return {
        categories: categories.filter((c) => c.product_count > 0).map((c) => c.slug),
        products: products.map((p) => p.slug),
      };
    }),
  );
  const categories = [...new Set(perLang.flatMap((p) => p.categories))];
  const products = [...new Set(perLang.flatMap((p) => p.products))];
  const cities = (await getCities('ru')).map((c) => c.slug);

  const pages: PageRef[] = [
    { path: '/', langs: LANGS },
    { path: '/catalog', langs: LANGS },
    { path: '/prices', langs: LANGS },
    { path: '/reviews', langs: LANGS },
    { path: '/faq', langs: LANGS },
    { path: '/contacts', langs: LANGS },
    ...categories.map((slug) => ({ path: `/catalog/${slug}`, langs: LANGS })),
    ...products.map((slug) => ({ path: `/products/${slug}`, langs: LANGS })),
    ...cities.map((slug) => ({ path: `/city/${slug}`, langs: CITY_LANGS })),
  ];
  return pages;
}
