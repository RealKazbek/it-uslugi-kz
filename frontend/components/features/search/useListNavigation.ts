'use client';

import { useCallback, useEffect, useState } from 'react';

export interface ListNavigation {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  /** Keydown handler for ArrowUp/ArrowDown; wraps around. Returns true when the key was handled. */
  handleArrow: (key: string) => boolean;
}

/** Highlight position in a list of `count` rows. Resets to the first row when the list changes. */
export function useListNavigation(count: number, resetKey: string): ListNavigation {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [resetKey]);

  const handleArrow = useCallback(
    (key: string): boolean => {
      if (count === 0) return false;
      if (key === 'ArrowDown') {
        setActiveIndex((index) => (index + 1) % count);
        return true;
      }
      if (key === 'ArrowUp') {
        setActiveIndex((index) => (index - 1 + count) % count);
        return true;
      }
      return false;
    },
    [count],
  );

  return { activeIndex: count === 0 ? -1 : Math.min(activeIndex, count - 1), setActiveIndex, handleArrow };
}
