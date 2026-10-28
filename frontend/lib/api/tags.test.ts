import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCategories } from './categories';
import { getCities, getCity } from './cities';
import { getProduct, getProducts } from './products';

function captureTags(run: () => Promise<unknown>): Promise<string[]> {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('null', { status: 200 })),
  );
  return run().then(() => {
    const init = vi.mocked(fetch).mock.calls[0]?.[1] as { next?: { tags?: string[] } } | undefined;
    return init?.next?.tags ?? [];
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Each read must carry the tags that a backend change to its data sends, so edits refresh every page that shows them. */
describe('fetch tag sets', () => {
  it('product detail is refreshed by product edits and by any product change (related prices)', async () => {
    expect(await captureTags(() => getProduct('ru', 'lending'))).toEqual(['products', 'product:lending']);
  });

  it('product list is refreshed by any product change', async () => {
    expect(await captureTags(() => getProducts('ru'))).toEqual(['products']);
  });

  it('categories are refreshed by category edits and by product changes (counts)', async () => {
    expect(await captureTags(() => getCategories())).toEqual(['categories', 'products']);
  });

  it('city is refreshed by city edits, its own tag, and product changes (focus prices)', async () => {
    expect(await captureTags(() => getCity('kk', 'almaty'))).toEqual(['cities', 'city:almaty', 'products']);
  });

  it('city list is refreshed by city edits', async () => {
    expect(await captureTags(() => getCities('ru'))).toEqual(['cities']);
  });
});
