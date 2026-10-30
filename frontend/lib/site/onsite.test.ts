import { describe, expect, it } from 'vitest';
import { isOnsiteCity, onsiteText } from './onsite';

describe('onsite', () => {
  it('formats the badge per language', () => {
    expect(onsiteText('ru', ['Алматы'])).toBe('Выезд: Алматы');
    expect(onsiteText('en', ['Алматы'])).toBe('On-site visit: Almaty');
  });
  it('matches cities by their Russian name', () => {
    expect(isOnsiteCity('Алматы', ['Алматы'])).toBe(true);
    expect(isOnsiteCity('Астана', ['Алматы'])).toBe(false);
  });
});
