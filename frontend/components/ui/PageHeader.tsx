import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface PageHeaderProps {
  /** Breadcrumb trail, rendered above the title. */
  crumbs?: ReactNode;
  h1: string;
  lead?: string;
  /** Extra content under the lead (buttons, notes). */
  children?: ReactNode;
}

/** Top block of an inner page: breadcrumbs, h1, lead and optional actions. */
export function PageHeader({ crumbs, h1, lead, children }: PageHeaderProps) {
  return (
    <Section>
      <Container className="space-y-5">
        {crumbs}
        <h1 className="text-display">{h1}</h1>
        {lead && <p className="max-w-prose text-lg text-muted-foreground">{lead}</p>}
        {children}
      </Container>
    </Section>
  );
}
