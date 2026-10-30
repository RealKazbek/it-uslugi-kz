import { Calculator, Layers, MessageCircle, Rocket, type LucideIcon } from 'lucide-react';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { Step } from '@/lib/i18n/dict/types';
import { SectionHeading } from './SectionHeading';

const STEP_ICONS: LucideIcon[] = [MessageCircle, Calculator, Layers, Rocket];

interface HowSectionProps {
  title: string;
  lead: string;
  steps: Step[];
}

/** Four numbered steps joined by a line on desktop. */
export function HowSection({ title, lead, steps }: HowSectionProps) {
  return (
    <Section labelledBy="how">
      <Container className="space-y-10">
        <SectionHeading id="how" title={title} lead={lead} />
        <div className="relative">
          <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-border lg:block" />
          <Stagger as="ol" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length];
            return (
              <StaggerItem key={step.t} as="li" className="relative space-y-4">
                <span className="flex size-16 items-center justify-center rounded-full bg-accent text-2xl font-extrabold text-primary-hover ring-8 ring-background">
                  {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  {Icon && <Icon aria-hidden="true" className="size-5 text-primary" />}
                  <h3 className="text-xl">{step.t}</h3>
                </div>
                <p className="text-muted-foreground">{step.d}</p>
              </StaggerItem>
            );
          })}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
