import { priceText } from '@/lib/format/price';
import type { Lang } from '@/lib/i18n/locales';
import type { CardView } from './cards';
import type { CategoryView } from './localize';

export interface PriceRow {
  slug: string;
  name: string;
  count: number;
  priceText: string;
}

/** One row per non-empty category, priced at its cheapest product. Keeps the category order. */
export function priceRows(categories: CategoryView[], cards: CardView[], lang: Lang, rate: number): PriceRow[] {
  return categories
    .filter((category) => category.productCount > 0)
    .flatMap((category) => {
      const amounts = cards.filter((card) => card.category === category.slug).map((card) => card.priceKzt);
      if (amounts.length === 0) return [];
      return [
        {
          slug: category.slug,
          name: category.name,
          count: category.productCount,
          priceText: priceText(lang, Math.min(...amounts), rate),
        },
      ];
    });
}
