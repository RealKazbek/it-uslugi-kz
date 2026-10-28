import Link from 'next/link';
import { PriceTag } from '@/components/ui/PriceTag';
import type { FocusItem } from '@/lib/city/view';

/** Recommended products for a city, each with the city-specific reason. */
export function CityFocus({ items }: { items: FocusItem[] }) {
  return (
    <ol className="space-y-5">
      {items.map((item) => (
        <li key={item.href} className="border-t border-line pt-4">
          <p className="flex flex-wrap items-baseline justify-between gap-2">
            <Link href={item.href} className="text-lg font-bold text-ink no-underline hover:underline">
              {item.title}
            </Link>
            <PriceTag text={item.priceText} className="text-ink" />
          </p>
          <p className="max-w-prose text-muted">{item.reason}</p>
        </li>
      ))}
    </ol>
  );
}
