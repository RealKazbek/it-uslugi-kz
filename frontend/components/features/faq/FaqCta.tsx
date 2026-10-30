import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { OpenLeadButton } from '@/components/features/lead/OpenLeadButton';

interface FaqCtaProps {
  title: string;
  text: string;
  button: string;
}

/** Closing block of the FAQ page: opens the lead modal when the answer is not here. */
export function FaqCta({ title, text, button }: FaqCtaProps) {
  return (
    <Section labelledBy="faq-cta">
      <Container>
        <div className="space-y-6 rounded-xl border border-line bg-surface-tint p-8 text-ink md:p-14">
          <h2 id="faq-cta" className="text-h2">
            {title}
          </h2>
          <p className="max-w-prose text-body-lg text-ink-muted">{text}</p>
          <OpenLeadButton size="lg">{button}</OpenLeadButton>
        </div>
      </Container>
    </Section>
  );
}
