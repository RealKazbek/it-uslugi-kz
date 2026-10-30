import { getCategories } from '@/lib/api/categories';
import { getCities } from '@/lib/api/cities';
import { getProducts } from '@/lib/api/products';
import { categoryView } from '@/lib/catalog/localize';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import type { FooterLink } from './FooterNav';

const POPULAR_COUNT = 8;

export interface FooterLinkSets {
  services: FooterLink[];
  popular: FooterLink[];
  cities: FooterLink[];
}

async function orEmpty<T>(source: string, load: Promise<T[]>): Promise<T[]> {
  try {
    return await load;
  } catch (error) {
    console.error(`Footer: failed to load ${source}`, error);
    return [];
  }
}

/** Link lists for the footer columns. Failures degrade to an empty column. Cities exist in ru and kk only. */
export async function loadFooterLinks(lang: Lang): Promise<FooterLinkSets> {
  const [categories, products, cities] = await Promise.all([
    orEmpty('categories', getCategories()),
    orEmpty('products', getProducts(lang)),
    lang === 'en' ? Promise.resolve([]) : orEmpty('cities', getCities(lang)),
  ]);
  return {
    services: [...categories]
      .filter((c) => c.product_count > 0)
      .sort((a, b) => a.sort - b.sort)
      .map((c) => ({ href: localePath(lang, `/catalog/${c.slug}`), label: categoryView(c, lang).name })),
    popular: products
      .slice(0, POPULAR_COUNT)
      .map((p) => ({ href: localePath(lang, `/products/${p.slug}`), label: p.title })),
    cities: cities.map((c) => ({ href: localePath(lang, `/city/${c.slug}`), label: c.name })),
  };
}
