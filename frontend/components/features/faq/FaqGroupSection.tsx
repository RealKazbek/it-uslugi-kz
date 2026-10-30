import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FaqAccordion } from './FaqAccordion';
import type { FaqGroup } from '@/lib/faq/site';

/** One group of questions: an h2 that the chip nav links to, then the animated accordion. */
export function FaqGroupSection({ group }: { group: FaqGroup }) {
  return (
    <Section labelledBy={group.id}>
      <Container className="max-w-3xl space-y-6">
        <h2 id={group.id} className="scroll-mt-24 text-h2">
          {group.title}
        </h2>
        <FaqAccordion items={group.items} />
      </Container>
    </Section>
  );
}
