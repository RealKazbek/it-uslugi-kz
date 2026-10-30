import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Optional "see all" link shown on the right (desktop) or below (mobile). */
  link?: { href: string; label: string };
}

/** Shared heading block: optional eyebrow, h2, muted lead and an optional "see all" link. */
export function SectionHeading({ id, eyebrow, title, lead, link }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl space-y-3">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-primary-hover">{eyebrow}</p>}
        <h2 id={id} className="text-3xl font-extrabold md:text-4xl">
          {title}
        </h2>
        {lead && <p className="text-lg text-muted-foreground">{lead}</p>}
      </div>
      {link && (
        <Link href={link.href} className="inline-flex min-h-11 items-center gap-1 font-semibold text-primary no-underline hover:text-primary-hover hover:underline">
          {link.label}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </div>
  );
}
