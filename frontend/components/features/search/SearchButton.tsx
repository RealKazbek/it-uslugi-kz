'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { SearchDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { loadClientIndex } from '@/lib/search/clientIndex';
import { useSearch } from './SearchProvider';

/** Header icon that opens the palette. Hovering or focusing it starts loading the index. */
export function SearchButton({ lang, labels }: { lang: Lang; labels: Pick<SearchDict, 'label' | 'hint'> }) {
  const { openSearch } = useSearch();
  const preload = () => {
    loadClientIndex(lang).catch(() => undefined);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={labels.label}
      aria-keyshortcuts="Control+K Meta+K"
      title={`${labels.label} (${labels.hint})`}
      onClick={openSearch}
      onPointerEnter={preload}
      onFocus={preload}
    >
      <Search aria-hidden="true" />
    </Button>
  );
}
