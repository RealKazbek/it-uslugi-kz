import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { PriceTag } from '@/components/ui/PriceTag';
import type { FocusItem } from '@/lib/city/view';

/** Recommended products for a city, numbered cards, each with the city-specific reason. */
export function CityFocus({ items }: { items: FocusItem[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item.href}>
          <Card className="flex gap-4 p-5">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-primary-hover"
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="flex flex-wrap items-baseline justify-between gap-2">
                <Link href={item.href} className="text-lg font-bold text-foreground no-underline hover:underline">
                  {item.title}
                </Link>
                <PriceTag text={item.priceText} className="text-foreground" />
              </p>
              <p className="text-muted-foreground">{item.reason}</p>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}
