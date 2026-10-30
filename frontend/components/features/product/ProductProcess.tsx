import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import type { Step } from '@/lib/i18n/dict/types';

/** Numbered process cards. Renders nothing when the category has no process text. */
export function ProductProcess({ title, steps }: { title: string; steps: Step[] }) {
  if (steps.length === 0) return null;
  return (
    <section aria-labelledby="process" className="space-y-4">
      <h2 id="process" className="text-xl">{title}</h2>
      <Stagger as="ol" className="grid gap-3 sm:grid-cols-2">
        {steps.map((step, i) => (
          <StaggerItem as="li" key={step.t}>
            <Card className="flex h-full gap-3 p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-bold">{step.t}</p>
                <p className="text-sm text-muted-foreground">{step.d}</p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
