import { describe, expect, it } from 'vitest';
import { alternates, localePath, normalizePath, splitLocale } from './paths';

describe('localePath', () => {
  it('has no prefix for ru and prefixes kk and en', () => {
    expect(localePath('ru', '/catalog')).toBe('/catalog');
    expect(localePath('kk', '/catalog')).toBe('/kk/catalog');
    expect(localePath('en', '/products/lending')).toBe('/en/products/lending');
  });

  it('maps the home page to "/", "/kk" and "/en"', () => {
    expect(localePath('ru', '/')).toBe('/');
    expect(localePath('kk', '/')).toBe('/kk');
    expect(localePath('en', '/')).toBe('/en');
  });

  it('never produces a trailing slash', () => {
    expect(localePath('kk', '/catalog/')).toBe('/kk/catalog');
    expect(localePath('en', '/catalog/websites/')).toBe('/en/catalog/websites');
  });
});

describe('alternates', () => {
  it('returns only the requested languages', () => {
    expect(alternates('/city/almaty', ['ru', 'kk'])).toEqual({ ru: '/city/almaty', kk: '/kk/city/almaty' });
    expect(alternates('/catalog', ['ru', 'kk', 'en'])).toEqual({ ru: '/catalog', kk: '/kk/catalog', en: '/en/catalog' });
  });
});

describe('splitLocale', () => {
  it('detects a language segment and returns the rest', () => {
    expect(splitLocale('/kk/catalog')).toEqual({ lang: 'kk', rest: '/catalog' });
    expect(splitLocale('/ru')).toEqual({ lang: 'ru', rest: '/' });
    expect(splitLocale('/en/')).toEqual({ lang: 'en', rest: '/' });
  });

  it('returns null for un-prefixed paths', () => {
    expect(splitLocale('/catalog/')).toEqual({ lang: null, rest: '/catalog' });
    expect(splitLocale('/')).toEqual({ lang: null, rest: '/' });
    expect(splitLocale('/english')).toEqual({ lang: null, rest: '/english' });
  });
});

describe('normalizePath', () => {
  it('adds a leading slash and removes trailing slashes', () => {
    expect(normalizePath('catalog//')).toBe('/catalog');
    expect(normalizePath('///')).toBe('/');
  });
});
