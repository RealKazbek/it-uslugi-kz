import { FaqList, type FaqItem } from '@/components/ui/FaqList';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

/** Heading on the left, accordion on the right from lg. */
export function FaqSection({ title, items }: FaqSectionProps) {
  return (
    <Section labelledBy="faq">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <h2 id="faq" className="text-h2">
          {title}
        </h2>
        <FaqList items={items} />
      </Container>
    </Section>
  );
}
