'use client';

import { useEffect } from 'react';

/** Calls `onToggle` on Ctrl+K or ⌘K anywhere on the page. The default browser action is prevented. */
export function useSearchShortcut(onToggle: () => void): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      // event.code is layout-independent: Ctrl+K must also work with the Russian keyboard layout (key is 'л').
      if (event.code !== 'KeyK') return;
      event.preventDefault();
      onToggle();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onToggle]);
}
