import { priceWithUnit } from '@/lib/format/price';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import type { ProductCardDto } from '@/types/api';

/** Plain, serialisable card for server and client components (no functions, no config). */
export interface CardView {
  slug: string;
  category: string;
  title: string;
  short: string;
  priceText: string;
  href: string;
}

export interface CardGroup {
  slug: string;
  name: string;
  cards: CardView[];
}

export function cardView(product: ProductCardDto, lang: Lang, rate: number): CardView {
  return {
    slug: product.slug,
    category: product.category,
    title: product.title,
    short: product.short,
    priceText: priceWithUnit(lang, product.price_from_kzt, product.unit, rate),
    href: localePath(lang, `/products/${product.slug}`),
  };
}

/** Groups cards by category in the given category order. Categories without cards are skipped. */
export function groupByCategory(
  cards: CardView[],
  categories: { slug: string; name: string }[],
): CardGroup[] {
  return categories
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      cards: cards.filter((card) => card.category === category.slug),
    }))
    .filter((group) => group.cards.length > 0);
}
