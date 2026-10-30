'use client';

import Link from 'next/link';
import { cn } from '@/lib/ui/cn';

export interface ResultRowProps {
  id: string;
  href: string;
  title: string;
  subtitle?: string;
  /** Preformatted price line, e.g. "от 45 000 ₸". */
  price?: string;
  active?: boolean;
  onSelect?: () => void;
  onHover?: () => void;
}

/** One result: title, category or group under it, and the price for products. Mouse hover moves the highlight. */
export function ResultRow({ id, href, title, subtitle, price, active = false, onSelect, onHover }: ResultRowProps) {
  return (
    <Link
      id={id}
      href={href}
      role="option"
      aria-selected={active}
      prefetch={false}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        'flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2 text-foreground no-underline motion-reduce:transition-none',
        active ? 'bg-muted' : 'hover:bg-muted',
      )}
    >
      <span className="min-w-0">
        <span className="block truncate font-medium">{title}</span>
        {subtitle ? <span className="block truncate text-sm text-muted-foreground">{subtitle}</span> : null}
      </span>
      {price ? <span className="shrink-0 text-sm font-semibold text-foreground">{price}</span> : null}
    </Link>
  );
}
