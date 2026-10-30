import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { CatalogLinkGroup } from '@/lib/city/view';

/** Full catalog as compact links in cards, one card per category: title and price only. */
export function CityCatalogLinks({ groups }: { groups: CatalogLinkGroup[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <Card key={group.name} className="p-5">
          <h3 className="mb-3 text-lg font-bold">{group.name}</h3>
          <ul className="space-y-2 text-sm">
            {group.items.map((item) => (
              <li key={item.href} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <Link href={item.href} className="text-foreground">{item.title}</Link>
                <span className="shrink-0 tabular-nums text-muted-foreground">{item.priceText}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
