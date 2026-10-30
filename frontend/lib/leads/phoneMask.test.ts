import { describe, expect, it } from 'vitest';
import { formatKzPhone, isCompleteKzPhone } from './phoneMask';

describe('formatKzPhone', () => {
  it('formats a full number', () => {
    expect(formatKzPhone('+7 707 123 45 67')).toBe('+7 (707) 123-45-67');
  });

  it('strips a leading 8 as the country prefix', () => {
    expect(formatKzPhone('87071234567')).toBe('+7 (707) 123-45-67');
  });

  it('keeps a bare leading 7 as a national digit and drops it on an 11-digit paste', () => {
    expect(formatKzPhone('7071234567')).toBe('+7 (707) 123-45-67');
    expect(formatKzPhone('77071234567')).toBe('+7 (707) 123-45-67');
  });

  it('returns an empty string when there are no digits', () => {
    expect(formatKzPhone('')).toBe('');
    expect(formatKzPhone('+7 (')).toBe('');
    expect(formatKzPhone('abc')).toBe('');
  });

  it('formats progressively while typing', () => {
    expect(formatKzPhone('+7 (7')).toBe('+7 (7');
    expect(formatKzPhone('+7 (707')).toBe('+7 (707');
    expect(formatKzPhone('+7 (707) 1')).toBe('+7 (707) 1');
    expect(formatKzPhone('+7 (707) 123')).toBe('+7 (707) 123');
    expect(formatKzPhone('+7 (707) 123-4')).toBe('+7 (707) 123-4');
    expect(formatKzPhone('+7 (707) 123-45-6')).toBe('+7 (707) 123-45-6');
  });

  it('keeps at most ten national digits', () => {
    expect(formatKzPhone('+7 707 123 45 67 89')).toBe('+7 (707) 123-45-67');
  });

  it('removes letters and symbols', () => {
    expect(formatKzPhone('+7-707-abc-123')).toBe('+7 (707) 123');
  });

  it('is stable when re-formatting its own output', () => {
    const once = formatKzPhone('8 707 123 45 67');
    expect(formatKzPhone(once)).toBe(once);
  });
});

describe('isCompleteKzPhone', () => {
  it('is true only for ten national digits', () => {
    expect(isCompleteKzPhone('+7 (707) 123-45-67')).toBe(true);
    expect(isCompleteKzPhone('+7 (707) 123-45-6')).toBe(false);
    expect(isCompleteKzPhone('')).toBe(false);
    expect(isCompleteKzPhone('@username')).toBe(false);
  });
});
