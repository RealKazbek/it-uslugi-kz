import Link from 'next/link';
import { CityCatalogLinks } from './CityCatalogLinks';
import { CityFocus } from './CityFocus';
import { ButtonLink } from '@/components/ui/Button';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { FaqList } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';
import type { CatalogLinkGroup, CityView, FocusItem } from '@/lib/city/view';

export function CityIntro(props: { menuLabel: string; crumbs: Crumb[]; h1: string; intro: string; remote: string; ctaLabel: string; ctaHref: string }) {
  return (
    <Section>
      <Container className="space-y-5">
        <Breadcrumbs label={props.menuLabel} items={props.crumbs} />
        <h1 className="text-[1.9rem] leading-tight md:text-[2.4rem]">{props.h1}</h1>
        <p className="max-w-prose text-lg">{props.intro}</p>
        <p className="max-w-prose text-muted">{props.remote}</p>
        <ButtonLink href={props.ctaHref}>{props.ctaLabel}</ButtonLink>
      </Container>
    </Section>
  );
}

export function CityFocusSection({ heading, lead, items }: { heading: string; lead: string; items: FocusItem[] }) {
  return (
    <Section labelledBy="focus">
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="space-y-2">
          <h2 id="focus" className="text-2xl">{heading}</h2>
          <p className="text-muted">{lead}</p>
        </div>
        <CityFocus items={items} />
      </Container>
    </Section>
  );
}

export function CityCatalogSection({ heading, groups }: { heading: string; groups: CatalogLinkGroup[] }) {
  return (
    <Section labelledBy="catalog">
      <Container className="space-y-6">
        <h2 id="catalog" className="text-2xl">{heading}</h2>
        <CityCatalogLinks groups={groups} />
      </Container>
    </Section>
  );
}

export function CityNearbySection({ heading, cities }: { heading: string; cities: { href: string; name: string }[] }) {
  return (
    <Section labelledBy="nearby">
      <Container className="space-y-4">
        <h2 id="nearby" className="text-2xl">{heading}</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {cities.map((city) => (
            <li key={city.href}>
              <Link href={city.href} className="font-semibold">{city.name}</Link>
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
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id="faq" className="text-2xl">{heading}</h2>
        <FaqList items={view.faq} />
      </Container>
    </Section>
  );
}
