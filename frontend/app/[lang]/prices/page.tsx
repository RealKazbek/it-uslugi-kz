import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PriceTable } from '@/components/features/prices/PriceTable';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { localePath } from '@/lib/i18n/paths';
import { legal } from '@/lib/site/legal';
import { loadPrices } from '@/lib/prices/load';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/urls';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { LANGS } from '@/lib/i18n/locales';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  if (lang === null) return {};
  const data = await loadPrices(lang);
  const d = getDict(lang).prices;
  return buildPageMetadata({
    siteUrl: config.siteUrl,
    lang,
    path: '/prices',
    title: d.title(data.minText),
    description: d.description(data.productCount, data.minText),
    langs: LANGS,
  });
}

export default async function PricesPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const data = await loadPrices(lang);
  const crumbs = [
    { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') },
    { name: d.common.nav.prices, url: absoluteUrl(config.siteUrl, lang, '/prices') },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Section>
        <Container className="space-y-5">
          <Breadcrumbs label={d.common.menu} items={[{ name: crumbs[0]!.name, href: localePath(lang, '/') }, { name: crumbs[1]!.name, href: localePath(lang, '/prices') }]} />
          <h1 className="text-[1.9rem] md:text-[2.4rem]">{d.prices.h1(data.minText)}</h1>
          <p className="max-w-prose text-lg text-muted">{d.prices.lead}</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <PriceTable groups={data.groups} cols={d.prices.cols} />
        </Container>
      </Section>
      <Section labelledBy="legal">
        <Container className="max-w-prose space-y-3">
          <h2 id="legal" className="text-2xl">{d.prices.legalHeading}</h2>
          <p>{legal[lang]}</p>
        </Container>
      </Section>
      <Section labelledBy="cta" className="pb-24 md:pb-14">
        <Container className="space-y-4">
          <h2 id="cta" className="text-2xl">{d.prices.ctaTitle}</h2>
          <p className="max-w-prose text-muted">{d.prices.ctaText}</p>
          <ButtonLink href={whatsappGeneralLink(lang)}>{d.common.wa}</ButtonLink>
        </Container>
      </Section>
    </>
  );
}
