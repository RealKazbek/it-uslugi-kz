import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from './errors';
import { getProduct } from './products';
import { getCategories } from './categories';
import { getCity } from './cities';

function respond(status: number, body: unknown = {}): void {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(body), { status })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('API client', () => {
  it('sends ISR options and the product tag', async () => {
    respond(200, { slug: 'lending' });
    await getProduct('ru', 'lending');
    const [url, init] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(String(url)).toBe('http://localhost:8000/api/products/lending?lang=ru');
    expect(init).toMatchObject({ next: { revalidate: 3600, tags: ['products', 'product:lending'] } });
  });

  it('returns null for a missing product (404)', async () => {
    respond(404, { detail: 'Product not found.' });
    await expect(getProduct('en', 'missing')).resolves.toBeNull();
  });

  it('throws ApiError with the path for other non-2xx statuses', async () => {
    respond(500);
    const error = await getCategories().catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 500, path: '/api/categories' });
  });

  it('uses the categories tag for the category list', async () => {
    respond(200, []);
    await getCategories();
    const init = vi.mocked(fetch).mock.calls[0]?.[1];
    expect(init).toMatchObject({ next: { tags: ['categories', 'products'] } });
  });

  it('returns null for a missing city and uses the city tag', async () => {
    respond(404);
    await expect(getCity('kk', 'nowhere')).resolves.toBeNull();
    const init = vi.mocked(fetch).mock.calls[0]?.[1];
    expect(init).toMatchObject({ next: { tags: ['cities', 'city:nowhere', 'products'] } });
  });
});
