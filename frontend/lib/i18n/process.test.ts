import { describe, expect, it } from 'vitest';
import { selectProcess } from './process';

describe('selectProcess', () => {
  it('prefers the category-unit key', () => {
    const steps = selectProcess('ru', 'support', 'month');
    expect(steps[0]?.t).toBe('Знакомство с сайтом');
    expect(steps).toHaveLength(4);
  });

  it('falls back to the category key', () => {
    expect(selectProcess('en', 'websites', 'once')[0]?.t).toBe('Discovery call');
    expect(selectProcess('en', 'support', 'once')[0]?.t).toBe('Describe the task');
  });

  it('returns each language its own text', () => {
    expect(selectProcess('kk', 'bots', 'once')[0]?.t).toBe('Бот сценарийі');
  });

  it('returns an empty list for unknown categories', () => {
    expect(selectProcess('en', 'unknown', 'once')).toEqual([]);
  });
});
