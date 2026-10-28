import { describe, expect, it, vi } from 'vitest';
import { submitLeadToBackend } from './submit';

const payload = {
  name: 'Айгерим',
  contact: '+77066620060',
  channel: 'whatsapp',
  message: '',
  product: 'lending',
  page_url: '',
  lang: 'ru',
  website: '',
};

function mockFetch(status: number, body: unknown = {}): typeof fetch {
  return vi.fn(async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
}

const deps = (fetchImpl: typeof fetch) => ({ apiBaseUrl: 'http://backend:8000', fetchImpl });
const address = { forwardedFor: '1.2.3.4', realIp: '9.9.9.9' };

describe('submitLeadToBackend', () => {
  it('forwards a valid lead with X-Forwarded-For and maps 201 to ok', async () => {
    const fetchImpl = mockFetch(201, { ok: true });
    const result = await submitLeadToBackend(payload, address, deps(fetchImpl));
    expect(result).toEqual({ status: 201, body: { ok: true } });
    const [url, init] = vi.mocked(fetchImpl).mock.calls[0] ?? [];
    expect(url).toBe('http://backend:8000/api/leads');
    expect(init?.method).toBe('POST');
    expect((init?.headers as Record<string, string>)['X-Forwarded-For']).toBe('1.2.3.4');
  });

  it('uses x-real-ip when X-Forwarded-For is missing', async () => {
    const fetchImpl = mockFetch(201);
    await submitLeadToBackend(payload, { forwardedFor: null, realIp: '9.9.9.9' }, deps(fetchImpl));
    const init = vi.mocked(fetchImpl).mock.calls[0]?.[1];
    expect((init?.headers as Record<string, string>)['X-Forwarded-For']).toBe('9.9.9.9');
  });

  it('returns 400 with field names without calling the backend for invalid input', async () => {
    const fetchImpl = mockFetch(201);
    const result = await submitLeadToBackend({ ...payload, name: 'A' }, address, deps(fetchImpl));
    expect(result).toEqual({ status: 400, body: { ok: false, reason: 'invalid', fields: ['name'] } });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('maps a backend 400 to invalid fields', async () => {
    const result = await submitLeadToBackend(payload, address, deps(mockFetch(400, { contact: ['x'] })));
    expect(result).toEqual({ status: 400, body: { ok: false, reason: 'invalid', fields: ['contact'] } });
  });

  it('maps a backend 429 to throttled', async () => {
    const result = await submitLeadToBackend(payload, address, deps(mockFetch(429, { detail: 'slow' })));
    expect(result).toEqual({ status: 429, body: { ok: false, reason: 'throttled' } });
  });

  it('maps other backend statuses and network failures to 502', async () => {
    const serverError = await submitLeadToBackend(payload, address, deps(mockFetch(500)));
    expect(serverError.status).toBe(502);
    const failing = vi.fn(async () => {
      throw new TypeError('fetch failed');
    }) as unknown as typeof fetch;
    const network = await submitLeadToBackend(payload, address, deps(failing));
    expect(network).toEqual({ status: 502, body: { ok: false, reason: 'error' } });
  });
});
