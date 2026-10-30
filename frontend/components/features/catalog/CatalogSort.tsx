'use client';

import { ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { isSortKey, SORTS, type SortKey } from '@/lib/catalog/browse';

interface CatalogSortProps {
  label: string;
  options: Record<SortKey, string>;
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function CatalogSort({ label, options, value, onChange }: CatalogSortProps) {
  return (
    <Select value={value} onValueChange={(next) => isSortKey(next) && onChange(next)}>
      <SelectTrigger aria-label={label} className="sm:w-60">
        <ArrowUpDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        <span className="flex-1 truncate text-left">
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {SORTS.map((key) => (
          <SelectItem key={key} value={key}>
            {options[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
