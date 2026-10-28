import { Container } from '@/components/ui/Container';
import { FaqList, type FaqItem } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';

export function ProductFaq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <Section labelledBy="faq">
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id="faq" className="text-2xl">
          {title}
        </h2>
        <FaqList items={items} />
      </Container>
    </Section>
  );
}
