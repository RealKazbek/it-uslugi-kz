import { describe, expect, it } from 'vitest';
import { daysText, formatDayRange } from './days';

describe('formatDayRange', () => {
  it('shows a range or a single value', () => {
    expect(formatDayRange(3, 7)).toBe('3–7');
    expect(formatDayRange(1, 1)).toBe('1');
  });

  it('never shows values below 1', () => {
    expect(formatDayRange(0, 1)).toBe('1');
    expect(formatDayRange(0, 0)).toBe('1');
  });
});

describe('daysText', () => {
  it('shows the term for one-off work', () => {
    expect(daysText('ru', 'once', 3, 7)).toBe('срок: 3–7 рабочих дней');
    expect(daysText('en', 'once', 3, 7)).toBe('timeline: 3–7 working days');
    expect(daysText('kk', 'once', 2, 4)).toBe('мерзімі: 2–4 жұмыс күні');
  });

  it('shows the start delay for month, lesson and hour units', () => {
    expect(daysText('ru', 'month', 1, 3)).toBe('старт в течение 1 рабочего дня');
    expect(daysText('ru', 'lesson', 2, 3)).toBe('старт в течение 2 рабочих дня');
    expect(daysText('en', 'hour', 1, 1)).toBe('start within 1 working day');
    expect(daysText('kk', 'lesson', 1, 3)).toBe('бастау: 1 жұмыс күні ішінде');
  });

  it('uses Russian plural forms for the term', () => {
    expect(daysText('ru', 'once', 1, 1)).toBe('срок: 1 рабочий день');
    expect(daysText('ru', 'once', 1, 2)).toBe('срок: 1–2 рабочих дня');
    expect(daysText('ru', 'once', 3, 5)).toBe('срок: 3–5 рабочих дней');
    expect(daysText('ru', 'once', 21, 21)).toBe('срок: 21 рабочий день');
  });
});
