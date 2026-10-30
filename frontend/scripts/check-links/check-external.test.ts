import { describe, expect, it } from 'vitest';
import { checkContacts, checkExternal } from './check-external';

describe('checkExternal', () => {
  it.each([
    'https://wa.me/77066620060',
    'https://wa.me/77066620060?text=hi',
    'https://t.me/RealKazbek',
    'https://www.instagram.com/perne.kz',
    'https://tiktok.com/@perne_kz',
    'tel:+77066620060',
    'mailto:37765@iitu.edu.kz',
    'https://example.com/anything',
  ])('accepts %s', (href) => {
    expect(checkExternal(href)).toBeNull();
  });

  it.each([
    ['https://wa.me/+7706', 'wa.me digits'],
    ['http://wa.me/77066620060', 'https'],
    ['https://t.me/ab', 't.me username'],
    ['https://tiktok.com/perne', 'tiktok @'],
    ['https://instagram.com/', 'instagram name'],
    ['tel:87066620060', 'tel plus'],
    ['mailto:not-an-email', 'mailto shape'],
    ['https://', 'unparseable'],
  ])('rejects %s (%s)', (href) => {
    expect(checkExternal(href)).not.toBeNull();
  });
});

describe('checkContacts', () => {
  it('reports bad values and lists empty ones as not configured', () => {
    const result = checkContacts({ whatsapp: 'https://wa.me/abc', instagram: '', telegram: 'https://t.me/RealKazbek' });
    expect(result.problems).toEqual([{ page: 'CONTACTS', link: 'https://wa.me/abc', reason: expect.stringContaining('whatsapp:') }]);
    expect(result.notConfigured).toEqual(['instagram']);
  });
});
