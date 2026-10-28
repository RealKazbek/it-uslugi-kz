import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import type { Step } from '@/lib/i18n/dict/types';

/** Four-step process. Renders nothing when the category has no process text. */
export function ProductProcess({ title, steps }: { title: string; steps: Step[] }) {
  if (steps.length === 0) return null;
  return (
    <Section labelledBy="process">
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id="process" className="text-2xl">
          {title}
        </h2>
        <StepList steps={steps} />
      </Container>
    </Section>
  );
}
