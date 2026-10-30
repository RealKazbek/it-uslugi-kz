import { ArrowRight, Clock } from 'lucide-react';
import { imagePosition } from '@/lib/media/images';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { CardView } from '@/lib/catalog/cards';
import type { Dict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { onsiteText } from '@/lib/site/onsite';

export interface ProductCardLabels {
  order: string;
  timeline: string;
  /** Badge for on-site services, e.g. "Выезд: Алматы". */
  onsite: string;
}

/** Card button labels from the dictionary, so callers do not repeat the mapping. */
export function cardLabels(dict: Dict, lang: Lang): ProductCardLabels {
  return { order: dict.common.cta.order, timeline: dict.common.timeline, onsite: onsiteText(lang) };
}

const IMAGE_SIZES = '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

/** Catalog tile: photo, title (stretched link makes the whole card clickable), benefit, price, timeline, order button. */
interface ProductCardProps {
  card: CardView;
  labels: ProductCardLabels;
  /** Above-the-fold cards load their photo eagerly (LCP). */
  priority?: boolean;
}

export function ProductCard({ card, labels, priority = false }: ProductCardProps) {
  return (
    <Card
      interactive
      className="group relative flex h-full flex-col overflow-hidden motion-safe:transition-transform motion-safe:hover:-translate-y-1"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={card.image}
          alt={card.title}
          width={1200}
          height={800}
          style={{ objectPosition: imagePosition(card.image) }}
          priority={priority}
          sizes={IMAGE_SIZES}
          className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-slow motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug">
          <Link href={card.href} className="text-foreground no-underline after:absolute after:inset-0 after:content-['']">
            {card.title}
          </Link>
        </h3>
        {card.onsite && <Badge variant="soft" className="self-start">{labels.onsite}</Badge>}
        <p className="line-clamp-2 text-sm text-muted-foreground">{card.short}</p>
        <div className="mt-auto space-y-1 pt-2">
          <p className="text-xl font-extrabold tabular-nums text-foreground">{card.priceText}</p>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only">{labels.timeline}: </span>
            {card.timelineText}
          </p>
        </div>
        <ButtonLink href={card.href} size="sm" className="relative z-10 mt-2 w-full">
          {labels.order}
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </div>
    </Card>
  );
}
