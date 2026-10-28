import { getCategories } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import { categoryView } from '@/lib/catalog/localize';
import { config } from '@/lib/config';
import { daysText } from '@/lib/format/days';
import { priceText } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import type { ProductCardDto } from '@/types/api';

export interface PriceRow {
  href: string;
  title: string;
  price: string;
  format: string;
  timeline: string;
}

export interface PriceGroup {
  slug: string;
  name: string;
  rows: PriceRow[];
}

export interface PricesData {
  groups: PriceGroup[];
  minText: string;
  productCount: number;
}

/** One table row. The unit appears once, in the format column; the price text carries no unit. */
export function priceRow(lang: Lang, product: ProductCardDto, rate: number): PriceRow {
  return {
    href: localePath(lang, `/products/${product.slug}`),
    title: product.title,
    price: priceText(lang, product.price_from_kzt, rate),
    format: getDict(lang).common.units[product.unit],
    timeline: daysText(lang, product.unit, product.days_min, product.days_max),
  };
}

/** Price table data for every active product, grouped by category. One list request, no per-product calls. */
export async function loadPrices(lang: Lang): Promise<PricesData> {
  const [categoryDtos, products] = await Promise.all([getCategories(), getProducts(lang)]);
  const categories = [...categoryDtos].sort((a, b) => a.sort - b.sort).map((dto) => categoryView(dto, lang));
  const groups = categories
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      rows: products.filter((p) => p.category === category.slug).map((p) => priceRow(lang, p, config.usdRate)),
    }))
    .filter((group) => group.rows.length > 0);
  const min = products.length > 0 ? Math.min(...products.map((p) => p.price_from_kzt)) : null;
  return {
    groups,
    minText: min === null ? '' : priceText(lang, min, config.usdRate),
    productCount: products.length,
  };
}
