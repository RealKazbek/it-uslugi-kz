'use client';

import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { SortKey } from '@/lib/catalog/browse';
import { CatalogSearch } from './CatalogSearch';
import { CatalogSort } from './CatalogSort';
import { CategoryChips, type Chip } from './CategoryChips';
import type { CatalogLabels } from './CatalogBrowser';

interface CatalogToolbarProps {
  labels: CatalogLabels;
  chips: Chip[];
  category: string;
  query: string;
  sort: SortKey;
  count: number;
  dirty: boolean;
  onCategory: (slug: string) => void;
  onQuery: (value: string) => void;
  onSort: (value: SortKey) => void;
  onReset: () => void;
}

/** Sticky under the site header: search, sort, category chips, result count and reset. */
export function CatalogToolbar(props: CatalogToolbarProps) {
  const { labels } = props;
  return (
    <div className="sticky top-16 z-20 lg:static -mx-4 space-y-3 border-b border-border bg-background px-4 py-3 sm:mx-0 sm:rounded-xl sm:border sm:px-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <CatalogSearch label={labels.searchLabel} placeholder={labels.searchPlaceholder} value={props.query} onChange={props.onQuery} />
        <CatalogSort label={labels.sortLabel} options={labels.sorts} value={props.sort} onChange={props.onSort} />
      </div>
      <CategoryChips label={labels.filterLabel} chips={props.chips} active={props.category} onSelect={props.onCategory} />
      <div className="flex min-h-8 items-center justify-between gap-3 text-sm">
        <p role="status" className="font-semibold text-muted-foreground">
          {labels.results[props.count] ?? String(props.count)}
        </p>
        {props.dirty && (
          <Button type="button" variant="ghost" size="sm" onClick={props.onReset}>
            <RotateCcw aria-hidden="true" className="size-4" />
            {labels.reset}
          </Button>
        )}
      </div>
    </div>
  );
}
