'use client';

import { Fragment, useEffect } from 'react';
import { cn } from '@/lib/ui/cn';
import type { ComboboxGroup, ComboboxOption } from '@/types/combobox';

/** DOM id of the option at a flat index. Shared with Combobox for aria-activedescendant. */
export function optionDomId(baseId: string, index: number): string {
  return `${baseId}-opt-${index}`;
}

interface ComboboxListProps {
  baseId: string;
  listboxId: string;
  listLabel: string;
  groups: ComboboxGroup[];
  activeIndex: number;
  selectedValue: string;
  showNoResults: boolean;
  noResultsText: string;
  onPick: (option: ComboboxOption) => void;
}

const OPTION_CLASS = 'flex min-h-11 cursor-pointer items-center px-3 py-2 text-sm leading-snug hover:bg-muted';
const HEADER_CLASS = 'sticky top-0 bg-surface-100 px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground max-sm:bg-transparent';

/** Flat index of the first option in each group. */
function startIndexes(groups: ComboboxGroup[]): number[] {
  let next = 0;
  return groups.map((group) => {
    const start = next;
    next += group.options.length;
    return start;
  });
}

/** Scrolls the active option into view inside the listbox. */
function useScrollActive(baseId: string, activeIndex: number): void {
  useEffect(() => {
    if (activeIndex < 0) return;
    document.getElementById(optionDomId(baseId, activeIndex))?.scrollIntoView({ block: 'nearest' });
  }, [baseId, activeIndex]);
}

/** Presentational listbox: category groups with headers, options with ids for aria-activedescendant. */
export function ComboboxList(props: ComboboxListProps) {
  const { baseId, listboxId, listLabel, groups, activeIndex, selectedValue, showNoResults, noResultsText, onPick } = props;
  useScrollActive(baseId, activeIndex);
  const starts = startIndexes(groups);

  const renderOption = (option: ComboboxOption, index: number) => (
    <div
      key={`${option.value}-${index}`}
      id={optionDomId(baseId, index)}
      role="option"
      aria-selected={option.value === selectedValue}
      className={cn(OPTION_CLASS, index === activeIndex && 'bg-muted', option.value === selectedValue && 'font-semibold text-primary')}
      onMouseDown={(event) => {
        event.preventDefault();
        onPick(option);
      }}
    >
      {option.label}
    </div>
  );

  return (
    <div
      id={listboxId}
      role="listbox"
      onMouseDown={(event) => event.preventDefault()}
      aria-label={listLabel}
      className="absolute inset-x-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-line bg-surface-100 shadow-pop max-sm:static max-sm:mt-0 max-sm:min-h-0 max-sm:flex-1 max-sm:max-h-none max-sm:border-0 max-sm:bg-transparent max-sm:shadow-none"
    >
      {groups.map((group, gi) => {
        const rows = group.options.map((option, oi) => renderOption(option, (starts[gi] ?? 0) + oi));
        if (group.label === undefined) return <Fragment key={`plain-${gi}`}>{rows}</Fragment>;
        const headerId = `${baseId}-group-${gi}`;
        return (
          <div key={`group-${gi}`} role="group" aria-labelledby={headerId}>
            <div id={headerId} className={HEADER_CLASS}>
              {group.label}
            </div>
            {rows}
          </div>
        );
      })}
      {showNoResults && (
        <p role="status" className="px-3 py-3 text-sm text-muted-foreground">
          {noResultsText}
        </p>
      )}
    </div>
  );
}
