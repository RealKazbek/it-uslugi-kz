import { ProductCard } from '@/components/features/catalog/ProductCard';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { CardView } from '@/lib/catalog/cards';

export function ProductRelated({ title, cards }: { title: string; cards: CardView[] }) {
  if (cards.length === 0) return null;
  return (
    <Section labelledBy="related" className="bg-mist">
      <Container className="space-y-6">
        <h2 id="related" className="text-2xl">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <ProductCard key={card.slug} card={card} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
