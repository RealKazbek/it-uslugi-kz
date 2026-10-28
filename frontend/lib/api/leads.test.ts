import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitLead } from './leads';
import type { LeadPayload } from '@/types/lead';

const payload: LeadPayload = {
  name: 'Айгерим',
  contact: '+77066620060',
  channel: 'whatsapp',
  message: '',
  product: '',
  page_url: '',
  lang: 'ru',
  website: '',
};

function respond(status: number, body: unknown = {}): void {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), { status })));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('submitLead (browser client)', () => {
  it('posts the payload to the Next route and reports ok on 201', async () => {
    respond(201, { ok: true });
    await expect(submitLead(payload)).resolves.toEqual({ ok: true });
    const [url, init] = vi.mocked(fetch).mock.calls[0] ?? [];
    expect(url).toBe('/api/lead');
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toMatchObject({ name: 'Айгерим', lang: 'ru' });
  });

  it('returns the known invalid fields from a 400 and drops unknown names', async () => {
    respond(400, { ok: false, reason: 'invalid', fields: ['name', 'product', 'contact'] });
    await expect(submitLead(payload)).resolves.toEqual({ ok: false, reason: 'invalid', fields: ['name', 'contact'] });
  });

  it('reports throttled on 429', async () => {
    respond(429, { ok: false, reason: 'throttled' });
    await expect(submitLead(payload)).resolves.toEqual({ ok: false, reason: 'throttled' });
  });

  it('reports error on 502 and on a network failure', async () => {
    respond(502, { ok: false, reason: 'error' });
    await expect(submitLead(payload)).resolves.toEqual({ ok: false, reason: 'error' });
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline'); }));
    await expect(submitLead(payload)).resolves.toEqual({ ok: false, reason: 'error' });
  });
});
