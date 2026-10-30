'use client';

import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import type { CardView } from '@/lib/catalog/cards';
import { GRID_CLASS } from './gridClass';
import { ProductCard, type ProductCardLabels } from './ProductCard';

interface CardGridProps {
  cards: CardView[];
  labels: ProductCardLabels;
  /** Staggered reveal on first render only; once the visitor filters, changes are instant. */
  animate: boolean;
}

export function CardGrid({ cards, labels, animate }: CardGridProps) {
  if (!animate) {
    return (
      <div className={GRID_CLASS}>
        {cards.map((card) => (
          <ProductCard key={card.slug} card={card} labels={labels} />
        ))}
      </div>
    );
  }
  return (
    <Stagger className={GRID_CLASS}>
      {cards.map((card) => (
        <StaggerItem key={card.slug} className="h-full">
          <ProductCard card={card} labels={labels} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
