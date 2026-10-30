'use client';

import { useState, type KeyboardEvent } from 'react';
import { ComboboxList, optionDomId } from './ComboboxList';
import { cn } from '@/lib/ui/cn';
import type { ComboboxGroup, ComboboxOption } from '@/types/combobox';

export interface ComboboxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  groups: ComboboxGroup[];
  /** Returns the groups that match the query. Pinned groups should be kept by the caller. */
  filter: (groups: ComboboxGroup[], query: string) => ComboboxGroup[];
  /** Accessible name of the listbox; the input is named by its <label for>. */
  listLabel: string;
  searchPlaceholder: string;
  noResultsText: string;
}

const INPUT_CLASS =
  'mt-1.5 min-h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground';
const SHEET_CLASS =
  'max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-50 max-sm:flex max-sm:max-h-[70dvh] max-sm:flex-col max-sm:gap-3 max-sm:rounded-t-2xl max-sm:bg-surface-100 max-sm:p-4 max-sm:shadow-pop';

/** Flat list of every option, in display order. */
function allOptions(groups: ComboboxGroup[]): ComboboxOption[] {
  return groups.flatMap((group) => group.options);
}

/** Index of the first option outside the pinned groups, so Enter after typing picks a match, not "consultation". */
function firstResultIndex(groups: ComboboxGroup[]): number {
  const pinned = groups.filter((group) => group.pinned).reduce((sum, group) => sum + group.options.length, 0);
  const hasResults = groups.some((group) => !group.pinned && group.options.length > 0);
  return hasResults ? pinned : 0;
}

/** Label of the selected value. Falls back to the raw value (e.g. a slug missing from the list). */
function labelOf(groups: ComboboxGroup[], value: string): string {
  return allOptions(groups).find((option) => option.value === value)?.label ?? value;
}

/** Accessible combobox with a filterable listbox. On phones the open combobox becomes a bottom sheet. */
export function Combobox({ id, value, onChange, groups, filter, listLabel, searchPlaceholder, noResultsText }: ComboboxProps) {
  const listboxId = `${id}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);

  const visible = filter(groups, query);
  const options = allOptions(visible);
  const showNoResults = query.trim() !== '' && !visible.some((group) => !group.pinned);
  const activeId = open && options[active] ? optionDomId(id, active) : undefined;

  function close(): void {
    setOpen(false);
    setQuery('');
    setActive(-1);
  }

  function openList(): void {
    const selected = allOptions(groups).findIndex((option) => option.value === value);
    setOpen(true);
    setActive(Math.max(0, selected));
  }

  function pick(option: ComboboxOption): void {
    onChange(option.value);
    close();
  }

  function onTextChange(text: string): void {
    setQuery(text);
    setOpen(true);
    setActive(firstResultIndex(filter(groups, text)));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        openList();
      }
      return;
    }
    handleOpenKey(event);
  }

  function handleOpenKey(event: KeyboardEvent<HTMLInputElement>): void {
    const last = options.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive((index) => Math.min(index + 1, last));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive((index) => Math.max(index - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(last);
        break;
      case 'Enter':
        if (options[active]) {
          event.preventDefault();
          pick(options[active]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        close();
        break;
    }
  }

  return (
    <>
      {open && <div aria-hidden="true" className="fixed inset-0 z-40 bg-foreground/40 sm:hidden" onMouseDown={close} />}
      <div className={cn('relative', open && SHEET_CLASS)}>
        <input
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={activeId}
          placeholder={searchPlaceholder}
          value={open ? query : labelOf(groups, value)}
          onChange={(event) => onTextChange(event.target.value)}
          onClick={() => { if (!open) openList(); }}
          onKeyDown={onKeyDown}
          onBlur={close}
          className={INPUT_CLASS}
        />
        {open && (
          <ComboboxList
            baseId={id}
            listboxId={listboxId}
            listLabel={listLabel}
            groups={visible}
            activeIndex={active}
            selectedValue={value}
            showNoResults={showNoResults}
            noResultsText={noResultsText}
            onPick={pick}
          />
        )}
      </div>
    </>
  );
}
