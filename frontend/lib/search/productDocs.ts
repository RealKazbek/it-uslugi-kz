import type { CategoryView } from '@/lib/catalog/localize';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import type { ProductCardDto } from '@/types/api';
import type { SearchDoc } from './types';

/**
 * Product docs for one language. `otherLangProducts` are the same products fetched in the other languages:
 * their titles go into keywords so a query typed in any language finds the product.
 * Weight follows the API order (category sort, then product sort), so earlier products rank higher.
 */
export function productDocs(
  lang: Lang,
  products: ProductCardDto[],
  otherLangProducts: ProductCardDto[][],
  categories: CategoryView[],
): SearchDoc[] {
  const categoryName = new Map(categories.map((c) => [c.slug, c.name]));
  return products.map((product, index) => {
    const otherTitles = otherLangProducts
      .map((list) => list.find((p) => p.slug === product.slug)?.title)
      .filter((title): title is string => typeof title === 'string');
    return {
      id: `product:${product.slug}`,
      kind: 'product',
      title: product.title,
      subtitle: categoryName.get(product.category) ?? product.category,
      href: localePath(lang, `/products/${product.slug}`),
      priceFrom: product.price_from_kzt,
      keywords: [product.short, ...otherTitles].join(' '),
      weight: products.length - index,
    };
  });
}

