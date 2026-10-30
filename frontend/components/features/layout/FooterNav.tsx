import Link from 'next/link';
import type { ReactNode } from 'react';

export interface FooterLink {
  href: string;
  label: string;
}

export const footerLinkClass =
  'inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground no-underline transition-colors duration-fast hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-8';

/** One navigation landmark with a list of links; `extra` renders as a last list item. */
export function FooterNav({ label, links, extra, twoColumns }: { label: string; links: FooterLink[]; extra?: ReactNode; twoColumns?: boolean }) {
  return (
    <nav aria-label={label}>
      <ul className={twoColumns ? 'md:columns-2 md:gap-x-6' : undefined}>
        {links.map((link) => (
          <li key={link.href} className="break-inside-avoid">
            <Link href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
        {extra && <li className="pt-1">{extra}</li>}
      </ul>
    </nav>
  );
}
