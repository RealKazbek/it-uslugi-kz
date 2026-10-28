import { describe, expect, it } from 'vitest';
import { buildLeadPayload } from './build';

describe('buildLeadPayload', () => {
  it('merges visible values with hidden product, page and language', () => {
    const payload = buildLeadPayload(
      { name: 'Айгерим', contact: '+77066620060', channel: 'telegram', message: 'Привет', website: '' },
      { product: 'lending', pageUrl: 'https://uslugi.realkazbek.site/products/lending', lang: 'ru' },
    );
    expect(payload).toEqual({
      name: 'Айгерим',
      contact: '+77066620060',
      channel: 'telegram',
      message: 'Привет',
      product: 'lending',
      page_url: 'https://uslugi.realkazbek.site/products/lending',
      lang: 'ru',
      website: '',
    });
  });
});
