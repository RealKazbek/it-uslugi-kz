import type { CategoryView } from '@/lib/catalog/localize';
import { getDict } from '@/lib/i18n/dict';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import type { SearchDoc } from './types';

/** Category docs: one per category that has active products. Keywords carry the other languages' names. */
export function categoryDocs(lang: Lang, categories: CategoryView[], otherNames: Record<string, string[]>): SearchDoc[] {
  return categories
    .filter((c) => c.productCount > 0)
    .map((category) => ({
      id: `category:${category.slug}`,
      kind: 'category',
      title: category.name,
      href: localePath(lang, `/catalog/${category.slug}`),
      keywords: [category.short, ...(otherNames[category.slug] ?? [])].join(' '),
    }));
}

/** Site pages. Reviews are listed only when the site has approved reviews. */
export function pageDocs(lang: Lang, hasReviews: boolean): SearchDoc[] {
  const common = getDict(lang).common;
  const others = LANGS.filter((other) => other !== lang).map((other) => getDict(other).common);
  const page = (id: string, path: string, title: string, otherTitles: string[]): SearchDoc => ({
    id: `page:${id}`,
    kind: 'page',
    title,
    href: localePath(lang, path),
    keywords: otherTitles.join(' '),
  });
  const pages: SearchDoc[] = [
    page('home', '/', common.breadcrumbHome, others.map((o) => o.breadcrumbHome)),
    page('catalog', '/catalog', common.nav.catalog, others.map((o) => o.nav.catalog)),
    page('prices', '/prices', common.nav.prices, others.map((o) => o.nav.prices)),
    page('faq', '/faq', common.faq, others.map((o) => o.faq)),
    page('contacts', '/contacts', common.nav.contacts, others.map((o) => o.nav.contacts)),
  ];
  if (hasReviews) {
    pages.push(page('reviews', '/reviews', common.nav.reviews, others.map((o) => o.nav.reviews)));
  }
  return pages;
}
