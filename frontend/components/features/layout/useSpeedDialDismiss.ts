'use client';

import { type RefObject, useEffect } from 'react';

interface DismissOptions {
  open: boolean;
  containerRef: RefObject<HTMLElement | null>;
  onOutside: () => void;
  onEscape: () => void;
}

/** Closes the speed dial on a pointer down outside it or on Escape. Listens only while open. */
export function useSpeedDialDismiss({ open, containerRef, onOutside, onEscape }: DismissOptions): void {
  useEffect(() => {
    if (!open) return;
    const handlePointer = (event: PointerEvent) => {
      const node = containerRef.current;
      if (node && event.target instanceof Node && !node.contains(event.target)) onOutside();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, containerRef, onOutside, onEscape]);
}
