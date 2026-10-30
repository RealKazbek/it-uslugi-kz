import { LeadForm } from '@/components/features/lead/LeadForm';
import { ProductCtas } from './ProductCtas';
import { Reveal } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
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
  /** Products for the form's service select; empty hides it. */
}

/** Bottom of the page: messenger CTA next to the lead form for people who prefer a form. */
export function ProductLeadSection({ lang, title, absoluteUrl, product, cta, form, labels }: ProductLeadProps) {
  return (
    <Section labelledBy="lead-title">
      <Container>
        <Reveal>
          <Card className="grid gap-8 p-5 md:p-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-h3">{cta.heading}</h2>
              <p className="text-muted-foreground">{cta.text}</p>
              <ProductCtas lang={lang} title={title} absoluteUrl={absoluteUrl} product={product} />
            </div>
            <div className="space-y-4">
              <h2 id="lead-title" className="text-h3">{form.heading}</h2>
              <p className="text-muted-foreground">{form.text}</p>
              <LeadForm lang={lang} product={product} pageUrl={absoluteUrl} labels={labels} />
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
