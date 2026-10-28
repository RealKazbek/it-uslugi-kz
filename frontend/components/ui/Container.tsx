import type { ReactNode } from 'react';

/** Page width with the 16px side gutter used on phones. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-4 ${className}`.trim()}>{children}</div>;
}
