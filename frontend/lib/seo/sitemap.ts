import type { Lang } from '@/lib/i18n/locales';
import { absoluteUrl, hreflangMap } from './urls';
import type { PageRef } from './pages';

export interface SitemapEntry {
  url: string;
  alternates: { languages: Record<string, string> };
}

/** One sitemap entry per (page, language) pair, each listing every language version as an alternate. */
export function buildSitemapEntries(siteUrl: string, pages: PageRef[]): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (const page of pages) {
    const languages = hreflangMap(siteUrl, page.path, page.langs);
    for (const lang of page.langs) {
      entries.push({ url: absoluteUrl(siteUrl, lang as Lang, page.path), alternates: { languages } });
    }
  }
  return entries;
}
