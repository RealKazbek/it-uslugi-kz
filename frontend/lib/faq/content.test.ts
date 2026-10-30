import { describe, expect, it } from 'vitest';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { getSiteFaq } from './site';

const FORBIDDEN = /сделаем за вас|напишем за вас|ИП|ТОО/;

function allTexts(): { where: string; text: string }[] {
  return LANGS.flatMap((lang) => {
    const faq = getDict(lang).faq;
    const dictTexts = [faq.title, faq.description, faq.h1, faq.lead, faq.groupsLabel, faq.allQuestions, faq.ctaTitle, faq.ctaText, faq.ctaButton];
    const siteTexts = getSiteFaq(lang).flatMap((group) => [
      { where: `${lang}:${group.id}`, text: group.title },
      ...group.items.flatMap((item) => [
        { where: `${lang}:${item.id}:q`, text: item.q },
        { where: `${lang}:${item.id}:a`, text: item.a },
      ]),
    ]);
    return [...dictTexts.map((text) => ({ where: `${lang}:dict`, text })), ...siteTexts];
  });
}

describe('FAQ wording', () => {
  it('never uses the forbidden phrases in any language', () => {
    const hits = allTexts().filter(({ text }) => FORBIDDEN.test(text));
    expect(hits).toEqual([]);
  });

  it('states the 50/50 payment in the ru payment answer', () => {
    const item = getSiteFaq('ru')[0]?.items.find((i) => i.id === 'pay-split');
    expect(item?.a).toContain('50%');
  });
});
