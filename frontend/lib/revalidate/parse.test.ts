import { describe, expect, it } from 'vitest';
import { MAX_TAGS, parseRevalidateBody } from './parse';

describe('parseRevalidateBody', () => {
  it('accepts valid tags', () => {
    expect(parseRevalidateBody({ tags: ['products', 'product:lending', 'city:almaty-2'] })).toEqual({
      ok: true,
      tags: ['products', 'product:lending', 'city:almaty-2'],
    });
  });

  it('accepts an empty list', () => {
    expect(parseRevalidateBody({ tags: [] })).toEqual({ ok: true, tags: [] });
  });

  it('rejects non-object bodies and missing tags', () => {
    expect(parseRevalidateBody(null).ok).toBe(false);
    expect(parseRevalidateBody(['products']).ok).toBe(false);
    expect(parseRevalidateBody({}).ok).toBe(false);
    expect(parseRevalidateBody({ tags: 'products' }).ok).toBe(false);
  });

  it('rejects more than the maximum number of tags', () => {
    const tags = Array.from({ length: MAX_TAGS + 1 }, () => 'products');
    expect(parseRevalidateBody({ tags }).ok).toBe(false);
  });

  it('rejects tags outside the allowed pattern', () => {
    for (const bad of ['Products', 'product lending', 'a/b', '', 'x;y', 42]) {
      expect(parseRevalidateBody({ tags: [bad] }).ok).toBe(false);
    }
  });
});
