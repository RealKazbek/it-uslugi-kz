import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/** Vertical rhythm for a page block. Spacing is set here only, never by child margins. */
export function Section({ id, labelledBy, className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-10 md:py-14 ${className}`.trim()}>
      {children}
    </section>
  );
}
