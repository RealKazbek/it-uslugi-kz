import { describe, expect, it } from 'vitest';
import { loadConfig } from './config';

/** Test helper: a partial environment, typed as the process environment. */
function env(values: Record<string, string>): NodeJS.ProcessEnv {
  return values as NodeJS.ProcessEnv;
}

describe('loadConfig', () => {
  it('uses the documented defaults when the environment is empty', () => {
    expect(loadConfig(env({}))).toEqual({
      apiInternalUrl: 'http://localhost:8000',
      siteUrl: 'https://uslugi.realkazbek.site',
      usdRate: 500,
    });
  });

  it('parses USD_RATE and strips trailing slashes from URLs', () => {
    const config = loadConfig(env({ USD_RATE: '450', API_INTERNAL_URL: 'http://backend:8000/', SITE_URL: 'https://example.kz//' }));
    expect(config.usdRate).toBe(450);
    expect(config.apiInternalUrl).toBe('http://backend:8000');
    expect(config.siteUrl).toBe('https://example.kz');
  });

  it('treats a blank USD_RATE as the default', () => {
    expect(loadConfig(env({ USD_RATE: '   ' })).usdRate).toBe(500);
  });

  it('throws for a non-numeric or non-positive USD_RATE', () => {
    expect(() => loadConfig(env({ USD_RATE: 'abc' }))).toThrow('USD_RATE must be a positive number');
    expect(() => loadConfig(env({ USD_RATE: '0' }))).toThrow('USD_RATE must be a positive number');
    expect(() => loadConfig(env({ USD_RATE: '-5' }))).toThrow('USD_RATE must be a positive number');
  });
});
