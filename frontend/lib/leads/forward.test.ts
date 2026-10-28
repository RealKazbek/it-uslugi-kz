import { describe, expect, it } from 'vitest';
import { forwardedForValue, mapBackendResponse } from './forward';

describe('mapBackendResponse', () => {
  it('maps 201 to created', () => {
    expect(mapBackendResponse(201, { ok: true })).toEqual({ kind: 'created' });
  });

  it('maps 429 to throttled', () => {
    expect(mapBackendResponse(429, {})).toEqual({ kind: 'throttled' });
  });

  it('maps 400 to invalid with the field names', () => {
    expect(mapBackendResponse(400, { name: ['Too short.'], contact: ['Required.'] })).toEqual({
      kind: 'invalid',
      fields: ['name', 'contact'],
    });
    expect(mapBackendResponse(400, 'bad')).toEqual({ kind: 'invalid', fields: [] });
  });

  it('maps everything else to error', () => {
    expect(mapBackendResponse(500, null)).toEqual({ kind: 'error' });
    expect(mapBackendResponse(503, {})).toEqual({ kind: 'error' });
  });
});

describe('forwardedForValue', () => {
  it('keeps the incoming X-Forwarded-For unchanged', () => {
    expect(forwardedForValue('1.2.3.4, 10.0.0.1', '9.9.9.9')).toBe('1.2.3.4, 10.0.0.1');
  });

  it('falls back to x-real-ip when X-Forwarded-For is absent or blank', () => {
    expect(forwardedForValue(null, ' 5.6.7.8 ')).toBe('5.6.7.8');
    expect(forwardedForValue('  ', '5.6.7.8')).toBe('5.6.7.8');
  });

  it('returns null when neither header is present', () => {
    expect(forwardedForValue(null, null)).toBeNull();
  });
});
