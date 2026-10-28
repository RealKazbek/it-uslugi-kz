import { describe, expect, it, vi } from 'vitest';
import { createSlugIndex, SLUG_MIN_REFRESH_MS, SLUG_TTL_MS} from './slug-index';

function setup(initial: string[] | null = ['lending']) {
  let now = 1_000_000;
  let data: string[] | null = initial;
  const load = vi.fn(async () => (data === null ? null : [...data]));
  const onFailure = vi.fn();
  const index = createSlugIndex({ load, now: () => now, onFailure });
  return {
    index,
    load,
    onFailure,
    advance: (ms: number) => {
      now += ms;
    },
    set: (next: string[] | null) => {
      data = next;
    },
  };
}

describe('slug index', () => {
  it('hit: a known slug is answered from memory after the first load', async () => {
    const t = setup();
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(1);
  });

  it('miss then refresh: an unknown slug triggers one refresh and finds a newly added product', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.set(['lending', 'new-product']);
    t.advance(SLUG_MIN_REFRESH_MS);
    expect(await t.index.isKnown('products', 'new-product')).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(2);
  });

  it('refresh throttling: misses within 30 s do not reload the list again', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.advance(SLUG_MIN_REFRESH_MS - 1000);
    expect(await t.index.isKnown('products', 'nope')).toBe(false);
    expect(await t.index.isKnown('products', 'nope-2')).toBe(false);
    expect(t.load).toHaveBeenCalledTimes(1);
    t.advance(2000);
    expect(await t.index.isKnown('products', 'nope-3')).toBe(false);
    expect(t.load).toHaveBeenCalledTimes(2);
  });

  it('fail open: when the API cannot be reached, the answer is unknown (null), not a 404', async () => {
    const t = setup(null);
    expect(await t.index.isKnown('products', 'lending')).toBeNull();
    expect(t.onFailure).toHaveBeenCalledWith('products', 'slug list unavailable');
  });

  it('fail open on refresh: a failed refresh keeps answering unknown for missing slugs', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.set(null);
    t.advance(SLUG_TTL_MS + 1);
    expect(await t.index.isKnown('products', 'other')).toBeNull();
  });

  it('TTL: a stale set is reloaded on the next lookup', async () => {
    const t = setup(['lending']);
    await t.index.isKnown('products', 'lending');
    t.advance(SLUG_TTL_MS + 1);
    expect(await t.index.isKnown('products', 'lending')).toBe(true);
    expect(t.load).toHaveBeenCalledTimes(2);
  });
});
