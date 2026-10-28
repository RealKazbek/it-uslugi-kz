import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';
import { listPages } from '@/lib/seo/pages';
import { buildSitemapEntries } from '@/lib/seo/sitemap';

export const revalidate = 3600;

/** Served at /sitemap.xml (outside [lang], not rewritten by middleware). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await listPages();
  return buildSitemapEntries(config.siteUrl, pages).map((entry) => ({
    url: entry.url,
    alternates: entry.alternates,
  }));
}
