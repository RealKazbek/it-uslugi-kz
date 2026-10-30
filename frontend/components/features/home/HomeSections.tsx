import Link from 'next/link';
import { CategoryList } from '@/components/features/catalog/CategoryList';
import { ProductCard } from '@/components/features/catalog/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FaqList, type FaqItem } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import type { CardView } from '@/lib/catalog/cards';
import type { CategoryView } from '@/lib/catalog/localize';
import type { Step } from '@/lib/i18n/dict/types';

interface CategoriesSectionProps {
  title: string;
  categories: CategoryView[];
  hrefFor: (slug: string) => string;
  countLabel: (n: number) => string;
}

export function CategoriesSection({ title, categories, hrefFor, countLabel }: CategoriesSectionProps) {
  return (
    <Section labelledBy="categories">
      <Container className="space-y-6">
        <h2 id="categories" className="text-2xl">{title}</h2>
        <CategoryList categories={categories} hrefFor={hrefFor} countLabel={countLabel} />
      </Container>
    </Section>
  );
}

interface FeaturedSectionProps {
  title: string;
  allLabel: string;
  allHref: string;
  cards: CardView[];
}

export function FeaturedSection({ title, allLabel, allHref, cards }: FeaturedSectionProps) {
  return (
    <Section labelledBy="popular" className="bg-muted">
      <Container className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="popular" className="text-2xl">{title}</h2>
          <Link href={allHref} className="font-semibold">{allLabel}</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <ProductCard key={card.slug} card={card} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Two-column heading and body used by the process, about and FAQ sections. */
export function SplitSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <Section labelledBy={id}>
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 id={id} className="text-2xl">{title}</h2>
        {children}
      </Container>
    </Section>
  );
}

export function HowSection({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <SplitSection id="how" title={title}>
      <StepList steps={steps} />
    </SplitSection>
  );
}

export function AboutSection({ title, facts }: { title: string; facts: string[] }) {
  return (
    <SplitSection id="about" title={title}>
      <ul className="max-w-prose list-disc space-y-2 pl-5">
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </SplitSection>
  );
}

export function FaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <SplitSection id="faq" title={title}>
      <FaqList items={items} />
    </SplitSection>
  );
}

export function CitiesSection({ title, lead, cities }: { title: string; lead: string; cities: { href: string; name: string }[] }) {
  return (
    <Section labelledBy="cities">
      <Container className="space-y-6">
        <h2 id="cities" className="text-2xl">{title}</h2>
        <p className="max-w-prose text-muted-foreground">{lead}</p>
        {cities.length > 0 && (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 md:grid-cols-4">
            {cities.map((city) => (
              <li key={city.href}>
                <Link href={city.href} className="text-foreground">{city.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

export function CtaSection({ title, text, label, href }: { title: string; text: string; label: string; href: string }) {
  return (
    <Section labelledBy="cta" className="pb-24 md:pb-14">
      <Container className="space-y-4">
        <h2 id="cta" className="text-2xl">{title}</h2>
        <p className="max-w-prose text-muted-foreground">{text}</p>
        <ButtonLink href={href}>{label}</ButtonLink>
      </Container>
    </Section>
  );
}
