import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { Lang } from '@/lib/i18n/locales';
import { ProductCtas } from './ProductCtas';

interface ProductHeroProps {
  lang: Lang;
  menuLabel: string;
  crumbs: Crumb[];
  title: string;
  description: string;
  absoluteUrl: string;
}

export function ProductHero({ lang, menuLabel, crumbs, title, description, absoluteUrl }: ProductHeroProps) {
  return (
    <Section>
      <Container className="space-y-5">
        <Breadcrumbs label={menuLabel} items={crumbs} />
        <h1 className="text-[1.9rem] leading-tight md:text-[2.4rem]">{title}</h1>
        <p className="max-w-prose text-lg text-muted-foreground">{description}</p>
        <ProductCtas lang={lang} title={title} absoluteUrl={absoluteUrl} />
      </Container>
    </Section>
  );
}
