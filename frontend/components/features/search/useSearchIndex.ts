'use client';

import { useEffect, useState } from 'react';
import { loadClientIndex } from '@/lib/search/clientIndex';
import type { SearchIndex } from '@/lib/search/index';
import type { Lang } from '@/lib/i18n/locales';

/** The language's index once loaded, null while loading or after a failure (logged in loadClientIndex). */
export function useSearchIndex(lang: Lang, enabled: boolean): SearchIndex | null {
  const [index, setIndex] = useState<SearchIndex | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadClientIndex(lang)
      .then((loaded) => {
        if (alive) setIndex(loaded);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [lang, enabled]);

  return index;
}
