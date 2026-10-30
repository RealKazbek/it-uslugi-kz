import { BadgeCheck, FileSignature, Handshake, Wallet, type LucideIcon } from 'lucide-react';
import { CountUp } from '@/components/motion/CountUp';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { Step } from '@/lib/i18n/dict/types';
import { SectionHeading } from './SectionHeading';

const TRUST_ICONS: LucideIcon[] = [BadgeCheck, FileSignature, Wallet, Handshake];

export interface TrustStat {
  value: number;
  label: string;
}

interface TrustSectionProps {
  title: string;
  lead: string;
  items: Step[];
  stats: TrustStat[];
}

/** Trust points as icon cards, then a strip of counters computed from real data. */
export function TrustSection({ title, lead, items, stats }: TrustSectionProps) {
  return (
    <Section labelledBy="trust" className="bg-muted">
      <Container className="space-y-10">
        <SectionHeading id="trust" title={title} lead={lead} />
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = TRUST_ICONS[index % TRUST_ICONS.length];
            return (
              <StaggerItem key={item.t} as="li" className="rounded-xl border border-border bg-card p-6">
                {Icon && (
                  <span className="mb-4 flex size-11 items-center justify-center rounded-lg bg-accent text-primary-hover">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                )}
                <h3 className="text-lg">{item.t}</h3>
                <p className="mt-2 text-muted-foreground">{item.d}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
        <dl className="grid grid-cols-2 gap-6 rounded-2xl bg-background p-6 md:grid-cols-4 md:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-stat">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
