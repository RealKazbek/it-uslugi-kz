import { describe, expect, it } from 'vitest';
import { phoneticKey } from './form';
import { toCyrillic, toLatin } from './translit';

describe('translit', () => {
  it('maps Cyrillic to Latin', () => {
    expect(toLatin('телеграм')).toBe('telegram');
    expect(toLatin('Қазақ')).toBe('qazaq');
  });

  it('maps Latin to Cyrillic, digraphs first', () => {
    expect(toCyrillic('telegram')).toBe('телеграм');
    expect(toCyrillic('WhatsApp')).toBe('вацапп');
    expect(toCyrillic('shop')).toBe('шоп');
  });

  it('phonetic key matches across scripts and typos', () => {
    expect(phoneticKey('телеграм')).toBe(phoneticKey('Telegram'));
    expect(phoneticKey('телеграмм')).toBe(phoneticKey('telegram'));
    expect(phoneticKey('вотсап')).toBe('votsap');
    expect(phoneticKey('WhatsApp')).toBe('vatsap');
  });
});
