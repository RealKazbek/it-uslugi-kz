import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from './SectionHeading';

export interface CityLink {
  href: string;
  name: string;
}

interface CitiesSectionProps {
  title: string;
  lead: string;
  cities: CityLink[];
}

/** City pages as chips. The page renders this only when there is at least one city. */
export function CitiesSection({ title, lead, cities }: CitiesSectionProps) {
  return (
    <Section labelledBy="cities" className="bg-muted">
      <Container className="space-y-8">
        <SectionHeading id="cities" title={title} lead={lead} />
        <ul className="flex flex-wrap gap-3">
          {cities.map((city) => (
            <li key={city.href}>
              <Link
                href={city.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-4 font-medium text-foreground no-underline shadow-card hover:bg-accent hover:text-accent-foreground"
              >
                <MapPin aria-hidden="true" className="size-4 text-primary" />
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
