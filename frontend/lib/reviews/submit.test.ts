import { describe, expect, it, vi } from 'vitest';
import { submitReviewToBackend } from './submit';

const payload = {
  name: 'Айгерим',
  company: '',
  city: 'Алматы',
  rating: 5,
  text: 'Сделали сайт быстро и аккуратно',
  locale: 'ru',
  website: '',
};

function mockFetch(status: number, body: unknown = {}): typeof fetch {
  return vi.fn(async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
}

const deps = (fetchImpl: typeof fetch) => ({ apiBaseUrl: 'http://backend:8000', fetchImpl });
const address = { forwardedFor: '1.2.3.4', realIp: '9.9.9.9' };

describe('submitReviewToBackend', () => {
  it('forwards a valid review with X-Forwarded-For and maps 201 to ok', async () => {
    const fetchImpl = mockFetch(201, { ok: true });
    const result = await submitReviewToBackend(payload, address, deps(fetchImpl));
    expect(result).toEqual({ status: 201, body: { ok: true } });
    const [url, init] = vi.mocked(fetchImpl).mock.calls[0] ?? [];
    expect(url).toBe('http://backend:8000/api/reviews');
    expect(init?.method).toBe('POST');
    expect((init?.headers as Record<string, string>)['X-Forwarded-For']).toBe('1.2.3.4');
  });

  it('drops empty optional fields from the backend body', async () => {
    const fetchImpl = mockFetch(201);
    await submitReviewToBackend(payload, address, deps(fetchImpl));
    const body = JSON.parse(String(vi.mocked(fetchImpl).mock.calls[0]?.[1]?.body)) as Record<string, unknown>;
    expect(body).not.toHaveProperty('company');
    expect(body.city).toBe('Алматы');
    expect(body.rating).toBe(5);
  });

  it('uses x-real-ip when X-Forwarded-For is missing', async () => {
    const fetchImpl = mockFetch(201);
    await submitReviewToBackend(payload, { forwardedFor: null, realIp: '9.9.9.9' }, deps(fetchImpl));
    const init = vi.mocked(fetchImpl).mock.calls[0]?.[1];
    expect((init?.headers as Record<string, string>)['X-Forwarded-For']).toBe('9.9.9.9');
  });

  it('returns 400 with field names without calling the backend for invalid input', async () => {
    const fetchImpl = mockFetch(201);
    const result = await submitReviewToBackend({ ...payload, rating: 9 }, address, deps(fetchImpl));
    expect(result).toEqual({ status: 400, body: { ok: false, reason: 'invalid', fields: ['rating'] } });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('maps a backend 400 to invalid fields', async () => {
    const result = await submitReviewToBackend(payload, address, deps(mockFetch(400, { text: ['x'] })));
    expect(result).toEqual({ status: 400, body: { ok: false, reason: 'invalid', fields: ['text'] } });
  });

  it('maps a backend 429 to throttled', async () => {
    const result = await submitReviewToBackend(payload, address, deps(mockFetch(429, { detail: 'slow' })));
    expect(result).toEqual({ status: 429, body: { ok: false, reason: 'throttled' } });
  });

  it('maps other backend statuses and network failures to 502', async () => {
    const serverError = await submitReviewToBackend(payload, address, deps(mockFetch(500)));
    expect(serverError.status).toBe(502);
    const failing = vi.fn(async () => {
      throw new TypeError('fetch failed');
    }) as unknown as typeof fetch;
    const network = await submitReviewToBackend(payload, address, deps(failing));
    expect(network).toEqual({ status: 502, body: { ok: false, reason: 'error' } });
  });
});
