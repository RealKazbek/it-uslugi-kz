import { describe, expect, it } from 'vitest';
import { normalize, tokenize } from './normalize';

describe('normalize', () => {
  it('lowercases, maps ё to е and strips punctuation', () => {
    expect(normalize('  Ёлка, ИНТЕРНЕТ-магазин!  ')).toBe('елка интернет магазин');
  });

  it('collapses whitespace', () => {
    expect(normalize('a \t  b')).toBe('a b');
  });

  it('tokenize returns no tokens for blank input', () => {
    expect(tokenize('  ...  ')).toEqual([]);
    expect(tokenize('Telegram-бот')).toEqual(['telegram', 'бот']);
  });
});
