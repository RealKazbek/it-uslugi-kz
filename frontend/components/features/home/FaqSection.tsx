import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FaqAccordion } from '@/components/features/faq/FaqAccordion';
import type { FaqItem } from '@/lib/faq/site';

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
  allLabel: string;
  allHref: string;
}

/** Heading and "all questions" link on the left, animated accordion on the right from lg. */
export function FaqSection({ title, items, allLabel, allHref }: FaqSectionProps) {
  return (
    <Section labelledBy="faq">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="space-y-6">
          <h2 id="faq" className="text-h2">
            {title}
          </h2>
          <ButtonLink href={allHref} variant="outline">
            {allLabel}
          </ButtonLink>
        </div>
        <FaqAccordion items={items} />
      </Container>
    </Section>
  );
}
