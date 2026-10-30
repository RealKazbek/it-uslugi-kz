import { ProductCard, type ProductCardLabels } from '@/components/features/catalog/ProductCard';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { CardView } from '@/lib/catalog/cards';
import { SectionHeading } from './SectionHeading';

interface PopularSectionProps {
  title: string;
  lead: string;
  allLabel: string;
  allHref: string;
  cards: CardView[];
  labels: ProductCardLabels;
}

/** Starter products, one per category, on the muted background. */
export function PopularSection({ title, lead, allLabel, allHref, cards, labels }: PopularSectionProps) {
  return (
    <Section labelledBy="popular" className="bg-muted">
      <Container className="space-y-8">
        <SectionHeading id="popular" title={title} lead={lead} link={{ href: allHref, label: allLabel }} />
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {cards.map((card) => (
            <StaggerItem key={card.slug} as="li" className="flex">
              <ProductCard card={card} labels={labels} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
