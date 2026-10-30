import type { Fetcher, Problem } from './types';

/** Pages every run starts from, besides the sitemap entries. */
export const START_PATHS = ['/ru', '/kk', '/en', '/'];

export interface Seeds {
  urls: string[];
  problems: Problem[];
}

/** Reads /sitemap.xml and maps every <loc> onto the base origin (the sitemap holds the production domain). */
export async function loadSeeds(base: URL, fetcher: Fetcher): Promise<Seeds> {
  const seeds: Seeds = { urls: START_PATHS.map((path) => new URL(path, base).href), problems: [] };
  const sitemapUrl = new URL('/sitemap.xml', base).href;
  const res = await fetcher(sitemapUrl);
  // A failed sitemap request is reported by the crawl itself, which also visits /sitemap.xml.
  if (res.status !== 200 || res.text === null) return seeds;
  const locs = [...res.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1] ?? '');
  if (locs.length === 0) {
    seeds.problems.push({ page: '/sitemap.xml', link: '/sitemap.xml', reason: 'no <loc> entries' });
  }
  for (const loc of locs) {
    try {
      const parsed = new URL(loc.trim());
      seeds.urls.push(new URL(parsed.pathname + parsed.search, base).href);
    } catch {
      seeds.problems.push({ page: '/sitemap.xml', link: loc, reason: 'unparseable <loc>' });
    }
  }
  return seeds;
}
