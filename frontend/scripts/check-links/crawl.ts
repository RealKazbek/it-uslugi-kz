import { checkPage } from './check-page';
import type { Fetcher, Problem } from './types';

const CONCURRENCY = 8;

export interface CrawlResult {
  problems: Problem[];
  pages: number;
  links: number;
}

/**
 * Breadth-first crawl from the seed URLs. Every internal page reached is checked once; external links are only
 * format-checked. Pages are processed in batches of CONCURRENCY.
 */
export async function crawl(base: URL, seeds: string[], fetcher: Fetcher): Promise<CrawlResult> {
  const queue: string[] = [];
  const seen = new Set<string>();
  const enqueue = (url: URL): void => {
    const key = new URL(url.href);
    key.hash = '';
    if (seen.has(key.href)) return;
    seen.add(key.href);
    queue.push(key.href);
  };
  for (const seed of seeds) enqueue(new URL(seed));

  const result: CrawlResult = { problems: [], pages: 0, links: 0 };
  let next = 0;
  while (next < queue.length) {
    const batch = queue.slice(next, next + CONCURRENCY);
    next += batch.length;
    const pages = await Promise.all(batch.map((url) => checkPage(url, base, fetcher)));
    for (const page of pages) {
      result.problems.push(...page.problems);
      result.links += page.checked;
      page.discovered.forEach(enqueue);
    }
    result.pages = queue.length;
  }
  return result;
}
