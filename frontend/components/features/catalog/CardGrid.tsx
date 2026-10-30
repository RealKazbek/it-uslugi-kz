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

/** The first row is visible on load: it renders without the hidden reveal state so it paints before hydration. */
const FIRST_ROW = 4;

export function CardGrid({ cards, labels, animate }: CardGridProps) {
  if (!animate) {
    return (
      <div className={GRID_CLASS}>
        {cards.map((card, index) => (
          <ProductCard key={card.slug} card={card} labels={labels} priority={index < FIRST_ROW} />
        ))}
      </div>
    );
  }
  return (
    <Stagger className={GRID_CLASS}>
      {cards.map((card, index) =>
        index < FIRST_ROW ? (
          <div key={card.slug} className="h-full">
            <ProductCard card={card} labels={labels} priority />
          </div>
        ) : (
          <StaggerItem key={card.slug} className="h-full">
            <ProductCard card={card} labels={labels} />
          </StaggerItem>
        ),
      )}
    </Stagger>
  );
}
