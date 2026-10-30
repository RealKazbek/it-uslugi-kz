import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaSection } from '@/components/features/home/CtaSection';
import { PortfolioCard } from '@/components/features/portfolio/PortfolioCard';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { caseViews } from '@/lib/portfolio/caseViews';
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
  const labels = { stack: d.portfolio.stack, imageAlt: d.portfolio.imageAlt };
  const cases = caseViews(PORTFOLIO, lang, portfolioImageExists);

  return (
    <>
      <JsonLd data={breadcrumbLd([home, here])} />
      <PageHeader
        crumbs={<Breadcrumbs label={d.common.menu} items={[{ name: home.name, href: localePath(lang, '/') }, { name: here.name, href: localePath(lang, '/portfolio') }]} />}
        h1={d.portfolio.h1}
        lead={d.portfolio.lead}
      />
      <Section>
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <li key={item.slug} className="flex">
                <PortfolioCard item={item} labels={labels} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaSection
        title={d.portfolio.ctaTitle}
        text={d.portfolio.ctaText}
        whatsappLabel={d.common.wa}
        whatsappHref={whatsappGeneralLink(lang)}
        telegramLabel={d.common.tg}
        telegramHref={telegramLink()}
      />
    </>
  );
}
