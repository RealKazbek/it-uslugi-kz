import { LeadForm } from '@/components/features/lead/LeadForm';
import { ProductCtas } from './ProductCtas';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { LeadDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';

export interface ProductLeadProps {
  lang: Lang;
  title: string;
  absoluteUrl: string;
  product: string;
  cta: { heading: string; text: string };
  form: { heading: string; text: string };
  labels: LeadDict;
}

/** Bottom of the page: WhatsApp/Telegram CTA, then the lead form for people who prefer a form. */
export function ProductLeadSection({ lang, title, absoluteUrl, product, cta, form, labels }: ProductLeadProps) {
  return (
    <>
      <Section labelledBy="cta-title">
        <Container className="space-y-4">
          <h2 id="cta-title" className="text-2xl">{cta.heading}</h2>
          <p className="max-w-prose text-muted-foreground">{cta.text}</p>
          <ProductCtas lang={lang} title={title} absoluteUrl={absoluteUrl} />
        </Container>
      </Section>
      <Section labelledBy="lead-title" className="pb-24 md:pb-14">
        <Container className="space-y-5">
          <h2 id="lead-title" className="text-2xl">{form.heading}</h2>
          <p className="max-w-prose text-muted-foreground">{form.text}</p>
          <LeadForm lang={lang} product={product} pageUrl={absoluteUrl} labels={labels} />
        </Container>
      </Section>
    </>
  );
}
