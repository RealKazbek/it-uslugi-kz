'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

const DESKTOP = '(min-width: 768px)';

/** Link column: accordion below 768px, always open and non-collapsible from 768px. Server HTML is open (works without JS). */
export function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP);
    const sync = () => {
      if (ref.current) ref.current.open = media.matches;
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <details ref={ref} open className="group border-b border-line md:border-0">
      <summary
        onClick={(event) => {
          if (window.matchMedia(DESKTOP).matches) event.preventDefault();
        }}
        className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-md text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:cursor-default [&::-webkit-details-marker]:hidden"
      >
        <h2 className="text-sm font-bold">{title}</h2>
        <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-fast group-open:rotate-180 md:hidden" />
      </summary>
      <div className="pb-4 md:pb-0 md:pt-2">{children}</div>
    </details>
  );
}
