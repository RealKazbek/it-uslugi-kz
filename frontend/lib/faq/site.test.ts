import { describe, expect, it, vi } from 'vitest';
import { LANGS } from '@/lib/i18n/locales';
import { getSiteFaq, HOME_FAQ_IDS, pickFaqItems, type FaqGroup } from './site';

const itemIds = (groups: FaqGroup[]) => groups.flatMap((group) => group.items.map((item) => item.id));

describe('site FAQ structure', () => {
  it('has the same groups, in the same order, with the same ids in every language', () => {
    const shape = (lang: (typeof LANGS)[number]) => getSiteFaq(lang).map((g) => ({ id: g.id, ids: g.items.map((i) => i.id) }));
    const ru = shape('ru');
    expect(shape('kk')).toEqual(ru);
    expect(shape('en')).toEqual(ru);
  });

  it('has nine groups with 3 to 5 questions each', () => {
    for (const lang of LANGS) {
      const groups = getSiteFaq(lang);
      expect(groups).toHaveLength(9);
      for (const group of groups) {
        expect(group.items.length, group.id).toBeGreaterThanOrEqual(3);
        expect(group.items.length, group.id).toBeLessThanOrEqual(5);
      }
    }
  });

  it('has at least 34 questions in every language, with unique ids', () => {
    for (const lang of LANGS) {
      const ids = itemIds(getSiteFaq(lang));
      expect(ids.length).toBeGreaterThanOrEqual(34);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('has non-empty questions and answers in every language', () => {
    for (const lang of LANGS) {
      for (const group of getSiteFaq(lang)) {
        expect(group.title.trim()).not.toBe('');
        for (const item of group.items) {
          expect(item.q.trim(), item.id).not.toBe('');
          expect(item.a.trim(), item.id).not.toBe('');
        }
      }
    }
  });

  it('has the eight home ids in every language', () => {
    expect(HOME_FAQ_IDS).toHaveLength(8);
    for (const lang of LANGS) {
      const ids = itemIds(getSiteFaq(lang));
      for (const id of HOME_FAQ_IDS) expect(ids, `${lang}:${id}`).toContain(id);
    }
  });
});

describe('pickFaqItems', () => {
  it('returns items in the order of the ids', () => {
    const picked = pickFaqItems(getSiteFaq('ru'), ['support', 'pay-split']);
    expect(picked.map((item) => item.id)).toEqual(['support', 'pay-split']);
  });

  it('skips an unknown id and logs it', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const picked = pickFaqItems(getSiteFaq('en'), ['no-such-id']);
    expect(picked).toEqual([]);
    expect(spy).toHaveBeenCalledWith('[faq] unknown item id', { id: 'no-such-id' });
    spy.mockRestore();
  });
});
