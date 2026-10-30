import { daysText } from '@/lib/format/days';
import { priceWithUnit } from '@/lib/format/price';
import { productImage } from '@/lib/media/images';
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
  /** Local WebP photo under /media. */
  image: string;
  priceKzt: number;
  daysMin: number;
  daysMax: number;
  timelineText: string;
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
    image: productImage(product.slug),
    priceKzt: product.price_from_kzt,
    daysMin: product.days_min,
    daysMax: product.days_max,
    timelineText: daysText(lang, product.unit, product.days_min, product.days_max),
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
