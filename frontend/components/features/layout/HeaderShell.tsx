'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/ui/cn';

const SCROLL_THRESHOLD = 10;

/** Fixed top bar. Gains a background, border and shadow once the page scrolls past 10px. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useScrolled(SCROLL_THRESHOLD);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-16 border-b min-[900px]:h-20 transition-all duration-base motion-reduce:transition-none',
        scrolled
          ? 'border-line bg-surface-100/90 shadow-[0_1px_8px_rgb(15_17_21/0.06)] backdrop-blur'
          : 'border-transparent bg-surface-100/70',
      )}
    >
      <Container className="grid h-full grid-cols-[1fr_auto_1fr] items-center">{children}</Container>
    </header>
  );
}

/** True once window.scrollY exceeds the threshold. Passive listener, removed on unmount. */
function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
