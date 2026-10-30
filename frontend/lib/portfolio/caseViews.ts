import type { Lang } from '@/lib/i18n/locales';
import { portfolioImagePath } from './images';
import type { PortfolioItem } from './items';

/** Plain, serialisable portfolio card data in one language. `image` is null when no screenshot exists. */
export interface CaseView {
  slug: string;
  title: string;
  stack: string[];
  description: string;
  links: { label: string; url: string }[];
  image: string | null;
}

/** Picks the language of each portfolio item. `hasImage` is checked on the server, not in components. */
export function caseViews(items: PortfolioItem[], lang: Lang, hasImage: (slug: string) => boolean): CaseView[] {
  return items.map((item) => ({
    slug: item.slug,
    title: item.title,
    stack: item.stack,
    description: item.description[lang],
    links: item.links.map((link) => ({ label: link.label[lang], url: link.url })),
    image: hasImage(item.slug) ? portfolioImagePath(item.slug) : null,
  }));
}
