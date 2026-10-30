import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { CityCatalogLinks } from './CityCatalogLinks';
import { CityFocus } from './CityFocus';
import { ButtonLink } from '@/components/ui/Button';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { FaqList } from '@/components/ui/FaqList';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import type { CatalogLinkGroup, CityView, FocusItem } from '@/lib/city/view';

export function CityIntro(props: { menuLabel: string; crumbs: Crumb[]; h1: string; intro: string; remote: string; ctaLabel: string; ctaHref: string }) {
  return (
    <PageHeader
      crumbs={<Breadcrumbs label={props.menuLabel} items={props.crumbs} />}
      h1={props.h1}
      lead={props.intro}
    >
      <p className="max-w-prose text-muted-foreground">{props.remote}</p>
      <div>
        <ButtonLink href={props.ctaHref} variant="whatsapp">
          <SiWhatsapp aria-hidden="true" />
          {props.ctaLabel}
        </ButtonLink>
      </div>
    </PageHeader>
  );
}

export function CityFocusSection({ heading, lead, items }: { heading: string; lead: string; items: FocusItem[] }) {
  return (
    <Section labelledBy="focus" className="bg-muted">
      <Container className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="space-y-3">
          <h2 id="focus" className="text-h2">{heading}</h2>
          <p className="text-lg text-muted-foreground">{lead}</p>
        </div>
        <CityFocus items={items} />
      </Container>
    </Section>
  );
}

export function CityCatalogSection({ heading, groups }: { heading: string; groups: CatalogLinkGroup[] }) {
  return (
    <Section labelledBy="catalog">
      <Container className="space-y-8">
        <h2 id="catalog" className="text-h2">{heading}</h2>
        <CityCatalogLinks groups={groups} />
      </Container>
    </Section>
  );
}

export function CityNearbySection({ heading, cities }: { heading: string; cities: { href: string; name: string }[] }) {
  return (
    <Section labelledBy="nearby" className="bg-muted">
      <Container className="space-y-8">
        <h2 id="nearby" className="text-h2">{heading}</h2>
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

export function CityFaqSection({ heading, view }: { heading: string; view: Pick<CityView, 'faq'> }) {
  return (
    <Section labelledBy="faq">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <h2 id="faq" className="text-h2">{heading}</h2>
        <FaqList items={view.faq} />
      </Container>
    </Section>
  );
}
