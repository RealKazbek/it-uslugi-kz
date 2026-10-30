import type { ReactNode } from 'react';
import { cn } from '@/lib/ui/cn';

interface SectionProps {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/** Vertical rhythm for a page block (py-12, py-20 from md). Spacing is set here only, never by child margins. */
export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-12 md:py-20', className)}>
      {children}
    </section>
  );
}
