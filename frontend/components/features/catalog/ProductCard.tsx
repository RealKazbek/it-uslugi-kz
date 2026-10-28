import Link from 'next/link';
import { PriceTag } from '@/components/ui/PriceTag';
import type { CardView } from '@/lib/catalog/cards';

/** Product row: ruled list item, no shadowed card. */
export function ProductCard({ card }: { card: CardView }) {
  return (
    <article className="flex flex-col gap-1 border-t border-line pt-4">
      <h3 className="text-lg">
        <Link href={card.href} className="text-ink no-underline hover:underline">
          {card.title}
        </Link>
      </h3>
      <p className="max-w-prose text-muted">{card.short}</p>
      <PriceTag text={card.priceText} className="mt-1 text-ink" />
    </article>
  );
}
