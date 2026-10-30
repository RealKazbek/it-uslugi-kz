'use client';

import { useEffect, type Dispatch, type SetStateAction } from 'react';

/** Opens the item whose id matches the URL hash (on load and on hash change) and scrolls to it. */
export function useHashOpen(ids: readonly string[], setOpen: Dispatch<SetStateAction<string[]>>): void {
  useEffect(() => {
    const sync = () => {
      let hash: string;
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return; // malformed escape such as #%E0
      }
      if (!ids.includes(hash)) return;
      setOpen((prev) => (prev.includes(hash) ? prev : [...prev, hash]));
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }));
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [ids, setOpen]);
}
