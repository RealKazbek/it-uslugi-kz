'use client';

import { useMemo, useState } from 'react';
import { CatalogGroups } from './CatalogGroups';
import { CatalogSearch } from './CatalogSearch';
import { CategoryChips, type Chip } from './CategoryChips';
import { ALL_CATEGORIES, filterGroups } from '@/lib/catalog/filter';
import type { CardGroup } from '@/lib/catalog/cards';

export interface CatalogLabels {
  filterAll: string;
  filterLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  empty: string;
}

interface CatalogBrowserProps {
  labels: CatalogLabels;
  groups: CardGroup[];
}

/** Category chips and text search. Without JavaScript the full grouped list is already in the HTML. */
export function CatalogBrowser({ labels, groups }: CatalogBrowserProps) {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [query, setQuery] = useState('');
  const visible = useMemo(() => filterGroups(groups, category, query), [groups, category, query]);
  const chips: Chip[] = [
    { slug: ALL_CATEGORIES, name: labels.filterAll },
    ...groups.map((group) => ({ slug: group.slug, name: group.name })),
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <CatalogSearch label={labels.searchLabel} placeholder={labels.searchPlaceholder} value={query} onChange={setQuery} />
        <CategoryChips label={labels.filterLabel} chips={chips} active={category} onSelect={setCategory} />
      </div>
      <CatalogGroups groups={visible} empty={labels.empty} />
    </div>
  );
}
