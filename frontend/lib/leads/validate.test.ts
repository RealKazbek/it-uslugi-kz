import { describe, expect, it } from 'vitest';
import { validateLead } from './validate';

const base = {
  name: 'Айгерим',
  contact: '+77066620060',
  channel: 'whatsapp',
  message: 'Нужен сайт',
  product: 'lending',
  page_url: 'https://uslugi.realkazbek.site/products/lending',
  lang: 'ru',
  website: '',
};

describe('validateLead', () => {
  it('accepts a complete payload and trims text fields', () => {
    const result = validateLead({ ...base, name: '  Айгерим  ' });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.name).toBe('Айгерим');
  });

  it('applies the name length rules 2..80', () => {
    expect(validateLead({ ...base, name: 'A' })).toEqual({ ok: false, fields: ['name'] });
    expect(validateLead({ ...base, name: 'A'.repeat(81) })).toEqual({ ok: false, fields: ['name'] });
    expect(validateLead({ ...base, name: 'AB' }).ok).toBe(true);
  });

  it('applies the contact length rules 3..100', () => {
    expect(validateLead({ ...base, contact: 'ab' })).toEqual({ ok: false, fields: ['contact'] });
    expect(validateLead({ ...base, contact: 'x'.repeat(101) })).toEqual({ ok: false, fields: ['contact'] });
  });

  it('limits the message to 2000 characters and allows it to be empty', () => {
    expect(validateLead({ ...base, message: 'x'.repeat(2001) })).toEqual({ ok: false, fields: ['message'] });
    expect(validateLead({ ...base, message: '' }).ok).toBe(true);
  });

  it('accepts only the four channels', () => {
    expect(validateLead({ ...base, channel: 'fax' })).toEqual({ ok: false, fields: ['channel'] });
    expect(validateLead({ ...base, channel: 'email' }).ok).toBe(true);
  });

  it('rejects malformed product slugs and unknown languages', () => {
    expect(validateLead({ ...base, product: 'Bad Slug' })).toEqual({ ok: false, fields: ['product'] });
    expect(validateLead({ ...base, lang: 'de' })).toEqual({ ok: false, fields: ['lang'] });
  });

  it('rejects non-object bodies', () => {
    expect(validateLead(null)).toEqual({ ok: false, fields: ['body'] });
    expect(validateLead('text')).toEqual({ ok: false, fields: ['body'] });
    expect(validateLead([])).toEqual({ ok: false, fields: ['body'] });
  });

  it('keeps the honeypot value so the backend can drop the submission', () => {
    const result = validateLead({ ...base, website: 'spam' });
    expect(result.ok && result.value.website).toBe('spam');
  });
});
