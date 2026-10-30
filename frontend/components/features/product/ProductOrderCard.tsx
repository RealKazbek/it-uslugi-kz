import { Check, Clock } from 'lucide-react';
import { ProductCtas } from './ProductCtas';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Lang } from '@/lib/i18n/locales';

export interface ProductOrderCardProps {
  lang: Lang;
  category: string;
  title: string;
  description: string;
  absoluteUrl: string;
  totalText: string;
  timelineText: string;
  highlights: string[];
  orderTitle: string;
  orderHint: string;
  priceNote: string;
}

/** Right column on desktop (sticky), directly after the gallery on mobile. */
export function ProductOrderCard(p: ProductOrderCardProps) {
  return (
    <Card className="space-y-5 p-5 md:p-6">
      <div className="space-y-3">
        <Badge variant="soft">{p.category}</Badge>
        <h1 className="text-[1.65rem] leading-tight md:text-3xl">{p.title}</h1>
        <p className="text-muted-foreground">{p.description}</p>
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-extrabold tabular-nums">{p.totalText}</p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock aria-hidden="true" className="size-4 shrink-0" />
          {p.timelineText}
        </p>
      </div>
      <ul className="space-y-2 border-t border-border pt-4">
        {p.highlights.map((item) => (
          <li key={item} className="flex gap-2 text-sm">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        <p className="sr-only">{p.orderTitle}</p>
        <ProductCtas lang={p.lang} title={p.title} absoluteUrl={p.absoluteUrl} />
        <p className="text-sm text-muted-foreground">{p.orderHint}</p>
        <p className="text-xs text-muted-foreground">{p.priceNote}</p>
      </div>
    </Card>
  );
}
