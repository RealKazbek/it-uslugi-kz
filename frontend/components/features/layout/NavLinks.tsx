'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/ui/cn';
import { isNavActive } from './navActive';

export interface NavItem {
  href: string;
  label: string;
}

/** Desktop navigation (from 900px). Each link has an underline that grows on hover and stays on the current page. */
export function NavLinks({ label, items }: { label: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="hidden items-center gap-6 min-[900px]:flex">
      {items.map((item) => {
        const active = isNavActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className="group relative py-2 font-medium text-foreground no-underline"
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-x-0 bottom-0 h-0.5 origin-center bg-brand transition-transform duration-base ease-out motion-reduce:transition-none',
                active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
