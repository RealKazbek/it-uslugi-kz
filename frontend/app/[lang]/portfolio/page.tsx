import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortfolioCard } from '@/components/features/portfolio/PortfolioCard';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { portfolioImageExists } from '@/lib/portfolio/images';
import { PORTFOLIO } from '@/lib/portfolio/items';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/lib/seo/urls';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  if (lang === null) return {};
  const d = getDict(lang).portfolio;
  return buildPageMetadata({ siteUrl: config.siteUrl, lang, path: '/portfolio', title: d.title, description: d.description, langs: LANGS });
}

export default async function PortfolioPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const home = { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') };
  const here = { name: d.common.nav.portfolio, url: absoluteUrl(config.siteUrl, lang, '/portfolio') };
  const labels = { stack: d.portfolio.stack, demo: d.portfolio.demo, imageAlt: d.portfolio.imageAlt };

  return (
    <>
      <JsonLd data={breadcrumbLd([home, here])} />
      <Section>
        <Container className="space-y-5">
          <Breadcrumbs label={d.common.menu} items={[{ name: home.name, href: localePath(lang, '/') }, { name: here.name, href: localePath(lang, '/portfolio') }]} />
          <h1 className="text-[1.9rem] md:text-[2.4rem]">{d.portfolio.h1}</h1>
          <p className="max-w-prose text-lg text-muted-foreground">{d.portfolio.lead}</p>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-10 md:grid-cols-2">
          {PORTFOLIO.map((item) => (
            <PortfolioCard key={item.slug} item={item} lang={lang} hasImage={portfolioImageExists(item.slug)} labels={labels} />
          ))}
        </Container>
      </Section>
      <Section labelledBy="cta" className="pb-24 md:pb-14">
        <Container className="space-y-4">
          <h2 id="cta" className="text-2xl">{d.portfolio.ctaTitle}</h2>
          <p className="max-w-prose text-muted-foreground">{d.portfolio.ctaText}</p>
          <ButtonLink href={whatsappGeneralLink(lang)} variant="whatsapp">{d.common.wa}</ButtonLink>
        </Container>
      </Section>
    </>
  );
}
