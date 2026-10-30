import { getCategories } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import { getReviewsSafe } from '@/lib/api/reviews';
import { categoryView, type CategoryView } from '@/lib/catalog/localize';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { categoryDocs, pageDocs } from './staticDocs';
import { faqDocs } from './faqDocs';
import { productDocs } from './productDocs';
import type { SearchDoc } from './types';

/**
 * Every searchable doc for one language, localised. Server only (cached API reads, ISR tags).
 * Titles of the other languages are fetched too, so queries typed in any language match.
 */
export async function loadSearchDocs(lang: Lang): Promise<SearchDoc[]> {
  const others = LANGS.filter((other) => other !== lang);
  const [categoryDtos, products, otherProducts, reviews] = await Promise.all([
    getCategories(),
    getProducts(lang),
    Promise.all(others.map((other) => getProducts(other))),
    getReviewsSafe(),
  ]);
  const sorted = [...categoryDtos].sort((a, b) => a.sort - b.sort);
  const categories = sorted.map((dto) => categoryView(dto, lang));
  const otherNames = categoryNamesBySlug(others.map((other) => sorted.map((dto) => categoryView(dto, other))));

  return [
    ...productDocs(lang, products, otherProducts, categories),
    ...categoryDocs(lang, categories, otherNames),
    ...faqDocs(lang),
    ...pageDocs(lang, reviews.results.length > 0),
  ];
}

function categoryNamesBySlug(perLang: CategoryView[][]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const list of perLang) {
    for (const category of list) {
      out[category.slug] = [...(out[category.slug] ?? []), category.name];
    }
  }
  return out;
}
