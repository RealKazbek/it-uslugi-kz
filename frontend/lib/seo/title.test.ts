import { describe, expect, it } from 'vitest';
import { TITLE_LIMIT, fitPriceTitle } from './title';

describe('fitPriceTitle', () => {
  it('keeps the suffix when everything fits', () => {
    expect(
      fitPriceTitle({ head: 'Лендинг', priceWithUsd: 'от 45 000 ₸', priceWithoutUsd: 'от 45 000 ₸' }),
    ).toBe('Лендинг — от 45 000 ₸ | RK Dev');
  });

  it('drops " | RK Dev" first', () => {
    const result = fitPriceTitle({
      head: 'Сайт для стоматологии и косметологии в Алматы с онлайн-записью',
      priceWithUsd: 'от 60 000 ₸',
      priceWithoutUsd: 'от 60 000 ₸',
    });
    expect(result.endsWith(' | RK Dev')).toBe(false);
    expect(result.endsWith('— от 60 000 ₸')).toBe(true);
  });

  it('drops the USD hint before cutting the name', () => {
    const head = 'Интернет-магазин одежды с каталогом и доставкой по Казахстану';
    const result = fitPriceTitle({
      head,
      priceWithUsd: 'from 180,000 ₸ (≈ $360)',
      priceWithoutUsd: 'from 180,000 ₸',
    });
    expect(result).not.toContain('≈');
    expect(result.endsWith('from 180,000 ₸')).toBe(true);
    expect(result.length).toBeLessThanOrEqual(TITLE_LIMIT);
  });

  it('cuts the name at a word boundary only as a last resort, never the price', () => {
    const result = fitPriceTitle({
      head: 'Очень длинное название продукта которое точно не влезет в заголовок страницы',
      priceWithUsd: 'from 180,000 ₸ (≈ $360)',
      priceWithoutUsd: 'from 180,000 ₸',
    });
    expect(result.length).toBeLessThanOrEqual(TITLE_LIMIT);
    expect(result.endsWith('— from 180,000 ₸')).toBe(true);
    expect(result).toContain('…');
  });

});

describe('fitPriceTitle price words', () => {
  it('never drops "от", "бастап" or "from"', () => {
    const long = 'Название '.repeat(12);
    for (const [price, word] of [
      ['от 45 000 ₸', 'от'],
      ['45 000 ₸ бастап', 'бастап'],
      ['from 45,000 ₸', 'from'],
    ] as const) {
      const result = fitPriceTitle({ head: long, priceWithUsd: price, priceWithoutUsd: price });
      expect(result).toContain(word);
      expect(result.length).toBeLessThanOrEqual(TITLE_LIMIT);
    }
  });
});
