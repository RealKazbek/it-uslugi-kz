import { CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { legal } from '@/lib/site/legal';
import type { Lang } from '@/lib/i18n/locales';

/** How we work (written agreement, 50/50 Kaspi) as checked cards, and the legal status text. Contacts page only. */
export function HowBlock({ lang, howHeading, howLines, legalHeading }: { lang: Lang; howHeading: string; howLines: string[]; legalHeading: string }) {
  return (
    <>
      <Section labelledBy="how" className="bg-muted">
        <Container className="space-y-8">
          <h2 id="how" className="text-h2">{howHeading}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {howLines.map((line) => (
              <li key={line}>
                <Card className="flex h-full items-start gap-3 p-5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                  <span>{line}</span>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section labelledBy="legal">
        <Container className="space-y-6">
          <h2 id="legal" className="text-h2">{legalHeading}</h2>
          <Card className="max-w-prose p-6 md:p-8">
            <p>{legal[lang]}</p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
