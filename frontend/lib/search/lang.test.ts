import { describe, expect, it } from 'vitest';
import { parseSearchLang } from './lang';
import { parseSearchQuery } from './query';

describe('parseSearchLang', () => {
  it('accepts the three site languages', () => {
    expect(parseSearchLang('ru')).toBe('ru');
    expect(parseSearchLang('kk')).toBe('kk');
    expect(parseSearchLang('en')).toBe('en');
  });

  it('rejects anything else, including a missing value and wrong case', () => {
    expect(parseSearchLang(null)).toBeNull();
    expect(parseSearchLang(undefined)).toBeNull();
    expect(parseSearchLang('')).toBeNull();
    expect(parseSearchLang('de')).toBeNull();
    expect(parseSearchLang('RU')).toBeNull();
    expect(parseSearchLang('ru ')).toBeNull();
  });
});

describe('parseSearchQuery', () => {
  it('trims, collapses spaces and caps the length', () => {
    expect(parseSearchQuery('  сайт   для  бизнеса ')).toBe('сайт для бизнеса');
    expect(parseSearchQuery('a'.repeat(500))).toHaveLength(200);
  });

  it('returns empty for missing or repeated parameters', () => {
    expect(parseSearchQuery(undefined)).toBe('');
    expect(parseSearchQuery(['a', 'b'])).toBe('');
  });
});
