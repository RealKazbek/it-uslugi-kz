'use client';

import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/ui/cn';
import { ALL_CATEGORIES } from '@/lib/catalog/filter';
import { categoryIcon } from './categoryIcons';

export interface Chip {
  slug: string;
  name: string;
}

interface CategoryChipsProps {
  label: string;
  chips: Chip[];
  active: string;
  onSelect: (slug: string) => void;
}

function chipClass(isActive: boolean): string {
  return cn(
    'inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-sm font-semibold transition-colors duration-base',
    isActive
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-background text-foreground hover:bg-muted',
  );
}

/** Category filter as toggle buttons: one scrolling row on mobile, wrapping on desktop. */
export function CategoryChips({ label, chips, active, onSelect }: CategoryChipsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {chips.map((chip) => {
        const Icon = chip.slug === ALL_CATEGORIES ? LayoutGrid : categoryIcon(chip.slug);
        return (
          <button
            key={chip.slug}
            type="button"
            aria-pressed={active === chip.slug}
            onClick={() => onSelect(chip.slug)}
            className={chipClass(active === chip.slug)}
          >
            <Icon aria-hidden="true" className="size-4" />
            {chip.name}
          </button>
        );
      })}
    </div>
  );
}
