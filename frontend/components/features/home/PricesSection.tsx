import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categoryIcon } from '@/components/features/catalog/categoryIcons';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { PriceRow } from '@/lib/catalog/minPrices';
import { SectionHeading } from './SectionHeading';

interface PricesSectionProps {
  title: string;
  lead: string;
  allLabel: string;
  allHref: string;
  rows: PriceRow[];
  hrefFor: (slug: string) => string;
  countLabel: (n: number) => string;
}

/** Lowest price per category as a clean list card. Muted background. */
export function PricesSection({ title, lead, allLabel, allHref, rows, hrefFor, countLabel }: PricesSectionProps) {
  return (
    <Section labelledBy="prices" className="bg-muted">
      <Container className="space-y-8">
        <SectionHeading id="prices" title={title} lead={lead} link={{ href: allHref, label: allLabel }} />
        <Card className="overflow-hidden">
          <ul className="divide-y divide-border">
            {rows.map((row) => {
              const Icon = categoryIcon(row.slug);
              return (
                <li key={row.slug}>
                  <Link href={hrefFor(row.slug)} className="group flex min-h-16 items-center gap-4 px-4 py-3 text-foreground no-underline hover:bg-muted sm:px-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary-hover">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold group-hover:underline">{row.name}</span>
                      <span className="block text-sm text-muted-foreground">{countLabel(row.count)}</span>
                    </span>
                    <span className="shrink-0 text-right font-extrabold tabular-nums">{row.priceText}</span>
                    <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </Container>
    </Section>
  );
}
