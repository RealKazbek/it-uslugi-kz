import { describe, expect, it } from 'vitest';
import { checkInternal } from './check-internal';
import type { FetchResult, Fetcher } from './types';

const page = (status: number, text: string | null, contentType = 'text/html'): FetchResult => ({
  status,
  finalUrl: '',
  contentType,
  text,
});

function fakeFetcher(responses: Record<string, FetchResult>): Fetcher {
  return async (url) => responses[url] ?? page(404, null);
}

const base = 'http://127.0.0.1:3000';

describe('checkInternal', () => {
  it('passes a 200 page without fragment', async () => {
    const fetcher = fakeFetcher({ [`${base}/ru/faq`]: page(200, '<h1>x</h1>') });
    expect(await checkInternal(new URL(`${base}/ru/faq`), fetcher)).toBeNull();
  });

  it('reports a 404 target with its status', async () => {
    expect(await checkInternal(new URL(`${base}/ru/nope`), fakeFetcher({}))).toBe('HTTP 404');
  });

  it('reports a request that failed with the error message', async () => {
    const fetcher: Fetcher = async () => ({ status: 0, finalUrl: '', contentType: '', text: null, error: 'timeout' });
    expect(await checkInternal(new URL(`${base}/x`), fetcher)).toBe('request failed: timeout');
  });

  it('checks that the fragment id exists on the target', async () => {
    const fetcher = fakeFetcher({ [`${base}/ru/faq`]: page(200, '<section id="price"></section>') });
    expect(await checkInternal(new URL(`${base}/ru/faq#price`), fetcher)).toBeNull();
    expect(await checkInternal(new URL(`${base}/ru/faq#missing`), fetcher)).toBe('no element with id "missing" on the target page');
  });

  it('skips the fragment check for #top and non-HTML targets', async () => {
    const fetcher = fakeFetcher({ [`${base}/ru/faq`]: page(200, '<p>x</p>'), [`${base}/feed.xml`]: page(200, '<rss/>', 'application/xml') });
    expect(await checkInternal(new URL(`${base}/ru/faq#top`), fetcher)).toBeNull();
    expect(await checkInternal(new URL(`${base}/feed.xml#item`), fetcher)).toBeNull();
  });

  it('accepts the statuses listed for form actions', async () => {
    const fetcher = fakeFetcher({ [`${base}/api/lead`]: page(405, null) });
    expect(await checkInternal(new URL(`${base}/api/lead`), fetcher, [200, 405])).toBeNull();
    expect(await checkInternal(new URL(`${base}/api/lead`), fetcher)).toBe('HTTP 405');
  });
});
