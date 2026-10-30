import { Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { CaseView } from '@/lib/portfolio/caseViews';
import { CaseCard } from './CaseCard';
import { SectionHeading } from './SectionHeading';

interface CasesSectionProps {
  title: string;
  lead: string;
  allLabel: string;
  allHref: string;
  items: CaseView[];
}

/** Real portfolio projects with links to open them. */
export function CasesSection({ title, lead, allLabel, allHref, items }: CasesSectionProps) {
  return (
    <Section labelledBy="cases">
      <Container className="space-y-8">
        <SectionHeading id="cases" title={title} lead={lead} link={{ href: allHref, label: allLabel }} />
        <Stagger as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.slug} as="li" className="flex">
              <CaseCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
