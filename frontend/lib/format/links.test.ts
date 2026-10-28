import { describe, expect, it } from 'vitest';
import { telegramLink, whatsappGeneralLink, whatsappProductLink } from './links';

const URL_RU = 'https://uslugi.realkazbek.site/products/lending';

describe('whatsappProductLink', () => {
  it('builds a wa.me link with the encoded product message in ru', () => {
    const link = whatsappProductLink('ru', 'Лендинг для бизнеса', URL_RU);
    const text = 'Здравствуйте! Интересует «Лендинг для бизнеса». ' + URL_RU;
    expect(link).toBe(`https://wa.me/77066620060?text=${encodeURIComponent(text)}`);
  });

  it('uses the kk and en message texts', () => {
    expect(decodeURIComponent(whatsappProductLink('kk', 'Лендинг', URL_RU))).toContain('Мені «Лендинг» қызықтырады.');
    expect(decodeURIComponent(whatsappProductLink('en', 'Landing', URL_RU))).toContain('"Landing"');
  });
});

describe('whatsappGeneralLink and telegramLink', () => {
  it('points at the primary WhatsApp number and the Telegram profile', () => {
    expect(whatsappGeneralLink('en').startsWith('https://wa.me/77066620060?text=')).toBe(true);
    expect(telegramLink()).toBe('https://t.me/RealKazbek');
  });
});
