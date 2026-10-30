import { describe, expect, it } from 'vitest';
import { DESCRIPTION_MAX, TITLE_MAX, fit } from './fit';
import { buildPageMetadata } from './metadata';
import { breadcrumbLd, faqPageLd, professionalServiceLd, serviceLd } from './jsonld';
import { hreflangMap } from './urls';

const SITE = 'https://uslugi.realkazbek.site';

describe('fit', () => {
  it('keeps short text and trims long text at a word boundary', () => {
    expect(fit('Короткий текст', 70)).toBe('Короткий текст');
    const long = 'слово '.repeat(60);
    const result = fit(long, 70);
    expect(result.length).toBeLessThanOrEqual(70);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('buildPageMetadata', () => {
  const meta = buildPageMetadata({
    siteUrl: SITE,
    lang: 'kk',
    path: '/city/almaty',
    title: 'T',
    description: 'D',
    langs: ['ru', 'kk'],
  });

  it('sets canonical, hreflang and x-default on the ru version', () => {
    expect(meta.alternates?.canonical).toBe(`${SITE}/kk/city/almaty`);
    expect(meta.alternates?.languages).toEqual({
      ru: `${SITE}/city/almaty`,
      kk: `${SITE}/kk/city/almaty`,
      'x-default': `${SITE}/city/almaty`,
    });
  });

  it('adds OpenGraph and Twitter summary tags with the page locale', () => {
    expect(meta.openGraph).toMatchObject({ locale: 'kk_KZ', alternateLocale: ['ru_RU'], type: 'website', siteName: 'Perne' });
    expect(meta.twitter).toMatchObject({ card: 'summary', title: 'T' });
  });

  it('enforces the title and description limits', () => {
    const big = buildPageMetadata({ siteUrl: SITE, lang: 'ru', path: '/', title: 'x'.repeat(200), description: 'y'.repeat(400), langs: ['ru'] });
    expect(String(big.title).length).toBeLessThanOrEqual(TITLE_MAX);
    expect(String(big.description).length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });
});

describe('hreflangMap', () => {
  it('has no x-default when ru does not exist', () => {
    expect(hreflangMap(SITE, '/x', ['en'])).toEqual({ en: `${SITE}/en/x` });
  });
});

describe('JSON-LD builders', () => {
  it('ProfessionalService has no aggregateRating and the contact fields', () => {
    const ld = professionalServiceLd(SITE);
    expect(ld).toMatchObject({ '@type': 'ProfessionalService', name: 'Perne', telephone: '+77066620060' });
    expect(JSON.stringify(ld)).not.toContain('aggregateRating');
  });

  it('Service carries a KZT offer with the starting price', () => {
    const ld = serviceLd({ name: 'Лендинг', description: 'd', url: `${SITE}/products/lending`, priceKzt: 45000 });
    expect(ld).toMatchObject({ '@type': 'Service', offers: { '@type': 'Offer', price: 45000, priceCurrency: 'KZT' } });
  });

  it('FAQPage and BreadcrumbList are numbered and well formed', () => {
    expect(faqPageLd([{ q: 'Q', a: 'A' }])).toMatchObject({ '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Q' }] });
    const crumbs = breadcrumbLd([{ name: 'A', url: SITE }, { name: 'B', url: `${SITE}/b` }]);
    expect(crumbs).toMatchObject({ '@type': 'BreadcrumbList', itemListElement: [{ position: 1 }, { position: 2 }] });
  });

  it('serialises to valid JSON', () => {
    expect(() => JSON.parse(JSON.stringify(professionalServiceLd(SITE)))).not.toThrow();
  });
});
