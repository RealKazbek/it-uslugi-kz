import Link from 'next/link';
import type { CatalogLinkGroup } from '@/lib/city/view';

/** Full catalog as compact links: title and price only, grouped by category. */
export function CityCatalogLinks({ groups }: { groups: CatalogLinkGroup[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.name}>
          <h3 className="mb-2 text-base font-bold">{group.name}</h3>
          <ul className="space-y-1 text-sm">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink">{item.title}</Link>{' '}
                <span className="tabular-nums text-muted">{item.priceText}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
