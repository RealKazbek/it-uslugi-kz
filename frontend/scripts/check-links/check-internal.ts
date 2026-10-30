import { extractRefs } from './extract';
import { describeFailure, isHtmlResponse } from './http';
import type { Fetcher } from './types';

/** Fragments that need no id on the page: the HTML spec's "top" and an empty fragment. */
const FREE_FRAGMENTS = new Set(['', 'top']);

function decodeFragment(hash: string): string {
  const raw = hash.slice(1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/**
 * Checks an internal URL: the final status (after redirects) must be one of okStatuses, and when the URL has
 * a #fragment the target HTML must contain an element with that id. Returns the problem, or null when fine.
 */
export async function checkInternal(url: URL, fetcher: Fetcher, okStatuses: number[] = [200]): Promise<string | null> {
  const pageUrl = new URL(url.href);
  pageUrl.hash = '';
  const res = await fetcher(pageUrl.href);
  if (!okStatuses.includes(res.status)) return describeFailure(res);
  const fragment = decodeFragment(url.hash);
  if (FREE_FRAGMENTS.has(fragment) || res.text === null || !isHtmlResponse(res)) return null;
  return extractRefs(res.text).ids.has(fragment) ? null : `no element with id "${fragment}" on the target page`;
}
