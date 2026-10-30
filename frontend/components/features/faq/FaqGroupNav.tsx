import Link from 'next/link';
import type { FaqGroup } from '@/lib/faq/site';

/** Chip links to each group heading on the FAQ page. */
export function FaqGroupNav({ groups, label }: { groups: readonly FaqGroup[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {groups.map((group) => (
          <li key={group.id}>
            <Link
              href={`#${group.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface-100 px-4 text-sm font-semibold text-ink hover:bg-surface-200"
            >
              {group.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
