import { ProductCard } from './ProductCard';
import type { CardGroup } from '@/lib/catalog/cards';

/** Grouped product cards, one section per category. Renders the empty message when nothing matches. */
export function CatalogGroups({ groups, empty }: { groups: CardGroup[]; empty: string }) {
  if (groups.length === 0) return <p className="text-muted">{empty}</p>;
  return (
    <>
      {groups.map((group) => (
        <section key={group.slug} aria-labelledby={`group-${group.slug}`} className="space-y-4">
          <h2 id={`group-${group.slug}`} className="text-2xl">
            {group.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {group.cards.map((card) => (
              <ProductCard key={card.slug} card={card} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
