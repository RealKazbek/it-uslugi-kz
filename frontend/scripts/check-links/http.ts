import type { FetchResult, Fetcher } from './types';

const TIMEOUT_MS = 20_000;
const USER_AGENT = 'it-uslugi-check-links/1.0';
const TEXT_TYPE = /text\/|xml|json/;

/**
 * Creates a GET fetcher that follows redirects. Each URL (fragment dropped) is requested once per run and
 * the result is shared by every caller, so pages are fetched once even when many pages link to them.
 */
export function createFetcher(): Fetcher {
  const cache = new Map<string, Promise<FetchResult>>();
  return (url: string) => {
    const key = withoutFragment(url);
    let pending = cache.get(key);
    if (!pending) {
      pending = request(key);
      cache.set(key, pending);
    }
    return pending;
  };
}

/** True when the response is an HTML document. */
export function isHtmlResponse(res: FetchResult): boolean {
  return res.contentType.includes('text/html');
}

/** Human-readable reason for a non-200 result, e.g. "HTTP 404" or "request failed: timeout". */
export function describeFailure(res: FetchResult): string {
  return res.status === 0 ? `request failed: ${res.error ?? 'unknown error'}` : `HTTP ${res.status}`;
}

function withoutFragment(url: string): string {
  const parsed = new URL(url);
  parsed.hash = '';
  return parsed.href;
}

async function request(url: string): Promise<FetchResult> {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': USER_AGENT },
    });
    const contentType = (res.headers.get('content-type') ?? '').toLowerCase();
    const wantText = res.status === 200 && TEXT_TYPE.test(contentType);
    const text = wantText ? await res.text() : null;
    if (!wantText) await res.body?.cancel();
    return { status: res.status, finalUrl: res.url, contentType, text };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { status: 0, finalUrl: url, contentType: '', text: null, error: message };
  }
}
