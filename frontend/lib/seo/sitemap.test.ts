import { describe, expect, it } from 'vitest';
import { buildSitemapEntries } from './sitemap';

const SITE = 'https://uslugi.realkazbek.site';

describe('buildSitemapEntries', () => {
  it('lists one entry per language with all alternates', () => {
    const entries = buildSitemapEntries(SITE, [{ path: '/prices', langs: ['ru', 'kk', 'en'] }]);
    expect(entries.map((e) => e.url)).toEqual([`${SITE}/prices`, `${SITE}/kk/prices`, `${SITE}/en/prices`]);
    expect(entries[1]?.alternates.languages).toEqual({
      ru: `${SITE}/prices`,
      kk: `${SITE}/kk/prices`,
      en: `${SITE}/en/prices`,
      'x-default': `${SITE}/prices`,
    });
  });

  it('gives city pages only ru and kk, with no en entry', () => {
    const entries = buildSitemapEntries(SITE, [{ path: '/city/almaty', langs: ['ru', 'kk'] }]);
    expect(entries).toHaveLength(2);
    expect(entries.some((e) => e.url.includes('/en/'))).toBe(false);
    expect(Object.keys(entries[0]?.alternates.languages ?? {})).toEqual(['ru', 'kk', 'x-default']);
  });
});
