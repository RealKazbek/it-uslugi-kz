'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState, type KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import type { SearchDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { popularProducts } from '@/lib/search/popular';
import type { SearchDoc } from '@/lib/search/types';
import { PaletteSections } from './PaletteSections';
import { ROW_ID_PREFIX, rowIdOf } from './rowIds';
import { useListNavigation } from './useListNavigation';
import { useRecentSearches } from './useRecentSearches';
import { useSearch } from './SearchProvider';
import { useSearchIndex } from './useSearchIndex';
import { useSearchResults } from './useSearchResults';

const POPULAR_LIMIT = 6;

export interface PaletteBodyProps {
  lang: Lang;
  labels: SearchDict;
}

/** Input, results and keyboard handling. Mounted only while the palette is open, so each open starts clean. */
export function PaletteBody({ lang, labels }: PaletteBodyProps) {
  const router = useRouter();
  const { setOpen } = useSearch();
  const [query, setQuery] = useState('');
  const index = useSearchIndex(lang, true);
  const { recent, remember, clear } = useRecentSearches();
  const results = useSearchResults(index, query);
  const popular = useMemo<SearchDoc[]>(() => (index ? popularProducts(index, POPULAR_LIMIT) : []), [index]);

  const trimmed = query.trim();
  const showEmpty = trimmed === '';
  const visible = showEmpty ? popular : results.docs;
  const rows = visible.map((doc) => ({ id: rowIdOf(doc), href: doc.href }));
  const nav = useListNavigation(rows.length, trimmed);
  const activeRow = nav.activeIndex >= 0 ? rows[nav.activeIndex] : undefined;

  /** A hash on the current page only changes the hash (router.push does not fire hashchange, so the FAQ item would stay closed). */
  const go = (href: string) => {
    const [path, hash] = href.split('#');
    if (hash && window.location.pathname === path) window.location.hash = hash;
    else router.push(href);
  };

  const finish = (href?: string) => {
    remember(trimmed);
    setOpen(false);
    if (href !== undefined) go(href);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (nav.handleArrow(event.key)) {
      event.preventDefault();
      return;
    }
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (activeRow) {
      finish(activeRow.href);
    } else if (trimmed !== '') {
      finish(`${localePath(lang, '/search')}?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const hoverDoc = (doc: SearchDoc) => nav.setActiveIndex(rows.findIndex((row) => row.id === rowIdOf(doc)));

  return (
    <>
      <div className="flex items-center gap-2 border-b border-line px-3">
        <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <input
          type="search"
          autoFocus
          role="combobox"
          aria-expanded={rows.length > 0}
          aria-controls={`${ROW_ID_PREFIX}-list`}
          aria-autocomplete="list"
          aria-activedescendant={activeRow?.id}
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
          placeholder={labels.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          className="h-12 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div id={`${ROW_ID_PREFIX}-list`} className="max-h-[60vh] overflow-y-auto overscroll-contain p-2">
        <PaletteSections
          lang={lang}
          labels={labels}
          query={trimmed}
          groups={results.groups}
          recent={recent}
          popular={popular}
          activeId={activeRow?.id}
          onPickRecent={setQuery}
          onClearRecent={clear}
          onSelect={(doc) => finish(doc.href)}
          onHover={hoverDoc}
          onBeforeRequest={() => setOpen(false)}
        />
      </div>
    </>
  );
}
