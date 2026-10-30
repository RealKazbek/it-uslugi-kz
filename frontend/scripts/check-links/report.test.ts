import { describe, expect, it } from 'vitest';
import { formatReport } from './report';

describe('formatReport', () => {
  it('says so when nothing is broken', () => {
    expect(formatReport([])).toBe('No broken links found.');
  });

  it('prints a page | link | problem table with a count', () => {
    const text = formatReport([{ page: '/ru/faq', link: '/ru/nope', reason: 'HTTP 404' }]);
    expect(text.split('\n')[0]).toMatch(/^page\s+\| link\s+\| problem$/);
    expect(text).toContain('/ru/faq | /ru/nope | HTTP 404');
    expect(text.endsWith('1 problem(s) found.')).toBe(true);
  });
});
