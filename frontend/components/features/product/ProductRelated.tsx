import type { ProductCardLabels } from '@/components/features/catalog/ProductCard';
import { ProductCard } from '@/components/features/catalog/ProductCard';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { CardView } from '@/lib/catalog/cards';

interface ProductRelatedProps {
  title: string;
  cards: CardView[];
  labels: ProductCardLabels;
}

export function ProductRelated({ title, cards, labels }: ProductRelatedProps) {
  if (cards.length === 0) return null;
  return (
    <Section labelledBy="related" className="bg-muted">
      <Container className="space-y-6">
        <h2 id="related" className="text-h3">{title}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <ProductCard key={card.slug} card={card} labels={labels} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
