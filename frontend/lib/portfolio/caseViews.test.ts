import { describe, expect, it } from 'vitest';
import { PORTFOLIO } from './items';
import { caseViews } from './caseViews';

describe('caseViews', () => {
  it('picks the language and marks only items with a screenshot', () => {
    const views = caseViews(PORTFOLIO, 'en', (slug) => slug === 'terracon');
    expect(views).toHaveLength(PORTFOLIO.length);
    expect(views[0]?.image).toBe('/portfolio/terracon.webp');
    expect(views[1]?.image).toBeNull();
    expect(views[0]?.description).toContain('Next.js');
    expect(views[0]?.links[0]?.label).toBe('Website terracon.kz');
    expect(views[1]?.title).toBe('AI assistant for Telegram Business');
  });
});
