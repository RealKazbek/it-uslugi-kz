import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { legal } from '@/lib/site/legal';
import type { Lang } from '@/lib/i18n/locales';

/** How we work (written agreement, 50/50 Kaspi) and the legal status text, shown on contacts only. */
export function HowBlock({ lang, howHeading, howLines, legalHeading }: { lang: Lang; howHeading: string; howLines: string[]; legalHeading: string }) {
  return (
    <>
      <Section labelledBy="how">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="how" className="text-2xl">{howHeading}</h2>
          <ul className="max-w-prose list-disc space-y-2 pl-5">
            {howLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section labelledBy="legal">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="legal" className="text-2xl">{legalHeading}</h2>
          <p className="max-w-prose">{legal[lang]}</p>
        </Container>
      </Section>
    </>
  );
}
