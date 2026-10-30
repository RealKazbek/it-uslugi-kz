import { describe, expect, it } from 'vitest';
import { validateLeadForm } from './validateForm';
import type { LeadPayload } from '@/types/lead';

const base: LeadPayload = {
  name: 'Айгерим',
  contact: '+7 (707) 123-45-67',
  channel: 'phone',
  message: '',
  product: '',
  page_url: 'https://uslugi.realkazbek.site/contacts',
  lang: 'ru',
  website: '',
};

describe('validateLeadForm', () => {
  it('accepts a complete phone', () => {
    expect(validateLeadForm(base).ok).toBe(true);
  });

  it('requires a complete phone in the contact field', () => {
    expect(validateLeadForm({ ...base, contact: '+7 (707) 123' })).toEqual({ ok: false, fields: ['contact'] });
    expect(validateLeadForm({ ...base, contact: '@username' })).toEqual({ ok: false, fields: ['contact'] });
  });

  it('keeps route errors and adds the phone error when both apply', () => {
    expect(validateLeadForm({ ...base, name: 'A', contact: '+7 (707)' })).toEqual({ ok: false, fields: ['name', 'contact'] });
  });

  it('does not duplicate the contact field when the route already flagged it', () => {
    expect(validateLeadForm({ ...base, name: 'A', contact: 'ab' })).toEqual({ ok: false, fields: ['name', 'contact'] });
  });
});
