import { describe, expect, it } from 'vitest';
import { validateReview } from './validate';

const base = {
  name: 'Айгерим',
  company: 'Qazaq Shop',
  city: 'Алматы',
  rating: 5,
  text: 'Сделали сайт быстро и аккуратно',
  locale: 'ru',
  website: '',
};

describe('validateReview', () => {
  it('accepts a complete review and trims text fields', () => {
    const result = validateReview({ ...base, name: '  Айгерим  ' });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.name).toBe('Айгерим');
  });

  it('accepts a numeric string rating from the form', () => {
    const result = validateReview({ ...base, rating: '4' });
    expect(result.ok && result.value.rating).toBe(4);
  });

  it('requires rating to be an integer from 1 to 5', () => {
    for (const rating of [0, 6, 3.5, '', 'abc', null]) {
      expect(validateReview({ ...base, rating })).toEqual({ ok: false, fields: ['rating'] });
    }
  });

  it('applies the name rule 2..80', () => {
    expect(validateReview({ ...base, name: 'A' })).toEqual({ ok: false, fields: ['name'] });
    expect(validateReview({ ...base, name: 'A'.repeat(81) })).toEqual({ ok: false, fields: ['name'] });
  });

  it('allows empty company and city and caps them at their backend limits', () => {
    expect(validateReview({ ...base, company: '', city: '' }).ok).toBe(true);
    expect(validateReview({ ...base, company: 'c'.repeat(121) })).toEqual({ ok: false, fields: ['company'] });
    expect(validateReview({ ...base, city: 'c'.repeat(81) })).toEqual({ ok: false, fields: ['city'] });
  });

  it('applies the text rule 10..2000 characters', () => {
    expect(validateReview({ ...base, text: 'коротко' })).toEqual({ ok: false, fields: ['text'] });
    expect(validateReview({ ...base, text: 'x'.repeat(2001) })).toEqual({ ok: false, fields: ['text'] });
    expect(validateReview({ ...base, text: 'x'.repeat(10) }).ok).toBe(true);
  });

  it('rejects unknown locales', () => {
    expect(validateReview({ ...base, locale: 'de' })).toEqual({ ok: false, fields: ['locale'] });
  });

  it('rejects non-object bodies', () => {
    expect(validateReview(null)).toEqual({ ok: false, fields: ['body'] });
    expect(validateReview('text')).toEqual({ ok: false, fields: ['body'] });
    expect(validateReview([])).toEqual({ ok: false, fields: ['body'] });
  });

  it('keeps the honeypot value so the backend can drop the submission', () => {
    const result = validateReview({ ...base, website: 'spam' });
    expect(result.ok && result.value.website).toBe('spam');
  });
});
