import { describe, expect, it } from 'vitest';
import { groupHits } from './group';
import type { SearchHit } from './types';

function hit(id: string, kind: SearchHit['doc']['kind']): SearchHit {
  return {
    score: 1,
    doc: { id, kind, title: id, href: `/${id}`, keywords: '' },
  };
}

describe('groupHits', () => {
  it('orders groups product, category, faq, page and drops empty ones', () => {
    const groups = groupHits([hit('p1', 'page'), hit('f1', 'faq'), hit('p2', 'product'), hit('p3', 'product')]);
    expect(groups.map((g) => g.kind)).toEqual(['product', 'faq', 'page']);
    expect(groups[0]?.hits.map((h) => h.doc.id)).toEqual(['p2', 'p3']);
  });

  it('caps each group at perGroup', () => {
    const groups = groupHits([hit('p1', 'product'), hit('p2', 'product'), hit('p3', 'product')], 2);
    expect(groups[0]?.hits).toHaveLength(2);
  });

  it('returns an empty list for no hits', () => {
    expect(groupHits([])).toEqual([]);
  });
});
