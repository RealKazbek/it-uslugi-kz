'use client';

import { useMemo, useState } from 'react';
import { filterCards, sortCards, type SortKey } from '@/lib/catalog/browse';
import { ALL_CATEGORIES } from '@/lib/catalog/filter';
import type { CardView } from '@/lib/catalog/cards';
import { CardGrid } from './CardGrid';
import { CatalogEmpty } from './CatalogEmpty';
import { CatalogToolbar } from './CatalogToolbar';
import type { Chip } from './CategoryChips';
import type { ProductCardLabels } from './ProductCard';

export interface CatalogLabels {
  filterAll: string;
  filterLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  empty: string;
  sortLabel: string;
  sorts: Record<SortKey, string>;
  /** Result-count text for 0..N matches (functions cannot cross the server/client boundary). */
  results: string[];
  reset: string;
  whatsapp: string;
  card: ProductCardLabels;
}

interface CatalogBrowserProps {
  labels: CatalogLabels;
  cards: CardView[];
  categories: Chip[];
  whatsappHref: string;
}

/** Search, category chips and sort over the full card list. Without JavaScript every card is already in the HTML. */
export function CatalogBrowser({ labels, cards, categories, whatsappHref }: CatalogBrowserProps) {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('popular');
  const [touched, setTouched] = useState(false);
  const visible = useMemo(() => sortCards(filterCards(cards, category, query), sort), [cards, category, query, sort]);
  const chips: Chip[] = [{ slug: ALL_CATEGORIES, name: labels.filterAll }, ...categories];
  const touch = <T,>(set: (value: T) => void) => (value: T) => {
    setTouched(true);
    set(value);
  };
  const reset = () => {
    setTouched(true);
    setCategory(ALL_CATEGORIES);
    setQuery('');
    setSort('popular');
  };

  return (
    <div className="space-y-6">
      <CatalogToolbar
        labels={labels}
        chips={chips}
        category={category}
        query={query}
        sort={sort}
        count={visible.length}
        dirty={category !== ALL_CATEGORIES || query !== '' || sort !== 'popular'}
        onCategory={touch(setCategory)}
        onQuery={touch(setQuery)}
        onSort={touch(setSort)}
        onReset={reset}
      />
      {visible.length === 0 ? (
        <CatalogEmpty text={labels.empty} ctaLabel={labels.whatsapp} ctaHref={whatsappHref} />
      ) : (
        <CardGrid cards={visible} labels={labels.card} animate={!touched} />
      )}
    </div>
  );
}
