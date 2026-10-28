import { describe, expect, it } from 'vitest';
import { formatKzt, priceText, priceWithUnit, usdAmount, usdHint } from './price';

const NBSP = ' ';

describe('formatKzt', () => {
  it('groups thousands with non-breaking spaces and adds the tenge sign', () => {
    expect(formatKzt(45000)).toBe(`45${NBSP}000${NBSP}₸`);
    expect(formatKzt(3000)).toBe(`3${NBSP}000${NBSP}₸`);
    expect(formatKzt(800)).toBe(`800${NBSP}₸`);
    expect(formatKzt(1234567)).toBe(`1${NBSP}234${NBSP}567${NBSP}₸`);
  });
});

describe('usdAmount', () => {
  it('rounds to 5 USD from 50 up', () => {
    expect(usdAmount(45000, 500)).toBe(90);
    expect(usdAmount(60000, 500)).toBe(120);
    expect(usdAmount(25000, 500)).toBe(50);
    expect(usdAmount(220000, 500)).toBe(440);
  });

  it('rounds to 1 USD below 50 and never goes under 1', () => {
    expect(usdAmount(3000, 500)).toBe(6);
    expect(usdAmount(5000, 500)).toBe(10);
    expect(usdAmount(100, 500)).toBe(1);
  });

  it('uses the configured rate', () => {
    expect(usdAmount(45000, 450)).toBe(100);
  });
});

describe('usdHint', () => {
  it('formats the approximate sign', () => {
    expect(usdHint(45000, 500)).toBe('≈ $90');
  });
});

describe('priceText', () => {
  it('uses the language phrasing for ru, kk and en', () => {
    expect(priceText('ru', 45000, 500)).toBe(`от 45${NBSP}000${NBSP}₸`);
    expect(priceText('kk', 45000, 500)).toBe(`45${NBSP}000${NBSP}₸ бастап`);
    expect(priceText('en', 45000, 500)).toBe(`from 45${NBSP}000${NBSP}₸ (≈ $90)`);
  });
});

describe('priceWithUnit', () => {
  it('appends the unit label of the language', () => {
    expect(priceWithUnit('ru', 4000, 'lesson', 500)).toBe(`от 4${NBSP}000${NBSP}₸ за урок`);
    expect(priceWithUnit('en', 25000, 'month', 500)).toBe(`from 25${NBSP}000${NBSP}₸ (≈ $50) per month`);
  });
});
