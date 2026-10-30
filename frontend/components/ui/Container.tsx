import type { ReactNode } from 'react';
import { cn } from '@/lib/ui/cn';

/** Page width: max-w-7xl with 16/24/32px gutters. Use max-w-prose inside it for long text. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
