import { describe, expect, it } from 'vitest';
import { CONTACTS } from './contacts';
import { activeContacts } from './speedDialItems';

const full = {
  whatsapp: 'https://wa.me/1',
  telegram: 'https://t.me/x',
  instagram: 'https://instagram.com/x',
  tiktok: 'https://tiktok.com/@x',
  phone: 'tel:+1',
  email: 'mailto:a@b.c',
};

describe('activeContacts', () => {
  it('returns items in display order', () => {
    expect(activeContacts(full).map((i) => i.key)).toEqual(['whatsapp', 'telegram', 'instagram', 'tiktok', 'phone', 'email']);
  });
  it('skips empty hrefs', () => {
    expect(activeContacts({ ...full, instagram: '', tiktok: '  ' }).map((i) => i.key)).toEqual(['whatsapp', 'telegram', 'phone', 'email']);
  });
  it('drops the placeholder social links from CONTACTS', () => {
    const keys = activeContacts(CONTACTS).map((i) => i.key);
    expect(keys).not.toContain('instagram');
    expect(keys).not.toContain('tiktok');
    expect(keys).toContain('whatsapp');
  });
});
