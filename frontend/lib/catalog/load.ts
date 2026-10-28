import { config } from '@/lib/config';
import { getCategories } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import type { Lang } from '@/lib/i18n/locales';
import { cardView, groupByCategory, type CardGroup, type CardView } from './cards';
import { categoryView, type CategoryView } from './localize';

export interface CatalogData {
  categories: CategoryView[];
  cards: CardView[];
  groups: CardGroup[];
  minPriceKzt: number | null;
}

/** Categories (in sort order) and active products for one language. Server only. */
export async function loadCatalog(lang: Lang): Promise<CatalogData> {
  const [categoryDtos, products] = await Promise.all([getCategories(), getProducts(lang)]);
  const categories = [...categoryDtos]
    .sort((a, b) => a.sort - b.sort)
    .map((dto) => categoryView(dto, lang));
  const cards = products.map((product) => cardView(product, lang, config.usdRate));
  const minPriceKzt = products.length > 0 ? Math.min(...products.map((p) => p.price_from_kzt)) : null;
  return {
    categories,
    cards,
    groups: groupByCategory(cards, categories.filter((c) => c.productCount > 0)),
    minPriceKzt,
  };
}
