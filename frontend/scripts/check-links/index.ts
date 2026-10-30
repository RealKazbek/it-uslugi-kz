import { CONTACTS } from '../../lib/site/contacts';
import { checkContacts } from './check-external';
import { crawl } from './crawl';
import { createFetcher } from './http';
import { formatReport } from './report';
import { loadSeeds, START_PATHS } from './seeds';
import type { Problem } from './types';

const DEFAULT_BASE_URL = 'http://127.0.0.1:3000';

/** Crawls the running site (BASE_URL, default http://127.0.0.1:3000) and returns the process exit code. */
async function main(): Promise<number> {
  const base = new URL(new URL(process.env.BASE_URL?.trim() || DEFAULT_BASE_URL).origin);
  const fetcher = createFetcher();
  const seeds = await loadSeeds(base, fetcher);
  const crawled = await crawl(base, [...seeds.urls, new URL('/sitemap.xml', base).href], fetcher);
  const contacts = checkContacts(CONTACTS);
  const problems: Problem[] = [...seeds.problems, ...crawled.problems, ...contacts.problems];

  console.log(`Checked ${crawled.pages} pages and ${crawled.links} references on ${base.origin} (start: ${START_PATHS.join(' ')}).`);
  if (contacts.notConfigured.length > 0) {
    console.log(`Not configured, skipped: ${contacts.notConfigured.join(', ')}.`);
  }
  console.log(formatReport(problems));
  return problems.length > 0 ? 1 : 0;
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (error: unknown) => {
    console.error('check-links crashed:', error);
    process.exitCode = 2;
  },
);
