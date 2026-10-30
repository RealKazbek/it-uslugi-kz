import { describe, expect, it } from 'vitest';
import { buildIndex } from './index';
import { popularProducts } from './popular';
import type { SearchDoc } from './types';

const doc = (id: string, kind: SearchDoc['kind'], weight?: number): SearchDoc => ({
  id,
  kind,
  title: id,
  href: `/${id}`,
  keywords: '',
  ...(weight === undefined ? {} : { weight }),
});

describe('popularProducts', () => {
  it('returns the highest-weight products only, up to the limit', () => {
    const index = buildIndex([
      doc('p1', 'product', 2),
      doc('c1', 'category', 9),
      doc('p2', 'product', 5),
      doc('p3', 'product', 1),
    ]);
    expect(popularProducts(index, 2).map((d) => d.id)).toEqual(['p2', 'p1']);
  });

  it('returns nothing for a zero limit', () => {
    expect(popularProducts(buildIndex([doc('p1', 'product', 1)]), 0)).toEqual([]);
  });
});
