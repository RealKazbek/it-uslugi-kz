import { describe, expect, it, vi } from 'vitest';
import { createSlugIndex, SLUG_BACKOFF_MS, SLUG_TTL_MS, type SlugPayload } from './slug-index';

const payload = (products: string[]): SlugPayload => ({ products, categories: ['web'], cities: ['almaty'] });

/** Fake clock and a controllable loader. `respond` decides the answer of each call. */
function setup(initial: string[] | null = ['lending']) {
  let now = 1_000_000;
  let current: string[] | null = initial;
  let down = false;
  const load = vi.fn(async (): Promise<SlugPayload | null> => {
    await Promise.resolve();
    if (down || current === null) return null;
    return payload(current);
  });
  const onFailure = vi.fn();
  const index = createSlugIndex({ load, now: () => now, onFailure });
  return {
    index,
    load,
    onFailure,
    advance: (ms: number) => {
      now += ms;
    },
    setProducts: (next: string[]) => {
      current = next;
    },
    setDown: (value: boolean) => {
      down = value;
    },
  };
}

describe('slug index: basics', () => {
  it('hit: a known slug is answered from memory after one load', async () => {
    const t = setup();
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(1);
  });

  it('miss then refresh: a new product is found after the backoff window', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.setProducts(['lending', 'new-product']);
    t.advance(SLUG_BACKOFF_MS);
    expect(await t.index.isKnown('products', 'new-product')).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(2);
  });

  it('TTL is 60 s: a fresh set is not reloaded before it expires', async () => {
    expect(SLUG_TTL_MS).toBe(60_000);
    const t = setup();
    await t.index.isKnown('products', 'lending');
    t.advance(SLUG_TTL_MS - 1);
    await t.index.isKnown('products', 'lending');
    expect(t.load).toHaveBeenCalledTimes(1);
  });
});

describe('slug index: concurrency', () => {
  it('60 concurrent misses cause one fetch', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.setProducts(['lending', 'added']);
    t.advance(SLUG_BACKOFF_MS);
    const answers = await Promise.all(Array.from({ length: 60 }, () => t.index.isKnown('products', 'added')));
    expect(answers.every((a) => a === true)).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(2);
  });

  it('60 concurrent first requests share one load', async () => {
    const t = setup(['lending']);
    const answers = await Promise.all(Array.from({ length: 60 }, () => t.index.isKnown('products', 'lending')));
    expect(answers.every((a) => a === true)).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(1);
  });
});

describe('slug index: outages', () => {
  it('repeated failures cause one fetch per 30 s', async () => {
    const t = setup(null);
    expect(await t.index.isKnown('products', 'x')).toBeNull();
    expect(t.load).toHaveBeenCalledTimes(1);
    t.advance(SLUG_BACKOFF_MS - 1000);
    expect(await t.index.isKnown('products', 'x')).toBeNull();
    expect(t.load).toHaveBeenCalledTimes(1);
    t.advance(1000);
    expect(await t.index.isKnown('products', 'x')).toBeNull();
    expect(t.load).toHaveBeenCalledTimes(2);
    t.advance(SLUG_BACKOFF_MS - 1000);
    expect(await t.index.isKnown('products', 'x')).toBeNull();
    expect(t.load).toHaveBeenCalledTimes(2);
    expect(t.onFailure).toHaveBeenCalled();
  });

  it('stale sets keep serving known slugs during an outage, without a blocking call', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.setDown(true);
    t.advance(SLUG_TTL_MS + 1);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    const callsAfterOutageStart = t.load.mock.calls.length;
    expect(callsAfterOutageStart).toBeLessThanOrEqual(2);
    t.advance(SLUG_BACKOFF_MS - 1000);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(t.load.mock.calls.length).toBe(callsAfterOutageStart);
  });

  it('an unknown slug during an outage is unknown (null), not a 404', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.setDown(true);
    t.advance(SLUG_TTL_MS + 1);
    expect(await t.index.isKnown('products', 'brand-new')).toBeNull();
  });
});
