'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useSearchShortcut } from './useSearchShortcut';

export interface SearchApi {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  setOpen: (open: boolean) => void;
}

const SearchContext = createContext<SearchApi | null>(null);

/** Open state of the site search palette, plus the global Ctrl+K / ⌘K shortcut. */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);
  useSearchShortcut(toggle);

  const api = useMemo<SearchApi>(
    () => ({ isOpen, openSearch, closeSearch, setOpen: setIsOpen }),
    [isOpen, openSearch, closeSearch],
  );
  return <SearchContext.Provider value={api}>{children}</SearchContext.Provider>;
}

/** Search palette controls. Throws when used outside SearchProvider. */
export function useSearch(): SearchApi {
  const api = useContext(SearchContext);
  if (api === null) throw new Error('useSearch must be used inside SearchProvider');
  return api;
}
