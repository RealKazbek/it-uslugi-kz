'use client';

import { useCallback, useEffect, useState } from 'react';
import { browserStore, clearRecent, pushRecent, readRecent, writeRecent } from '@/lib/search/recent';

export interface RecentApi {
  recent: string[];
  remember: (query: string) => void;
  clear: () => void;
}

/** Recent queries from localStorage. Read after mount (no server/client mismatch); every access is guarded. */
export function useRecentSearches(): RecentApi {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(readRecent(browserStore()));
  }, []);

  const remember = useCallback((query: string) => {
    setRecent((prev) => {
      const next = pushRecent(prev, query);
      writeRecent(browserStore(), next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    clearRecent(browserStore());
    setRecent([]);
  }, []);

  return { recent, remember, clear };
}
