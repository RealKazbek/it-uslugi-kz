import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaqCta } from '@/components/features/faq/FaqCta';
import { FaqGroupNav } from '@/components/features/faq/FaqGroupNav';
import { FaqGroupSection } from '@/components/features/faq/FaqGroupSection';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { getSiteFaq } from '@/lib/faq/site';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbLd, faqPageLd } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/lib/seo/urls';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  if (lang === null) return {};
  const d = getDict(lang).faq;
  return buildPageMetadata({
    siteUrl: config.siteUrl,
    lang,
    path: '/faq',
    title: d.title,
    description: d.description,
    langs: LANGS,
  });
}

export default async function FaqPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const groups = getSiteFaq(lang);
  const crumbs = [
    { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') },
    { name: d.faq.h1, url: absoluteUrl(config.siteUrl, lang, '/faq') },
  ];
  const items = groups.flatMap((group) => group.items);

  return (
    <>
      <JsonLd data={[breadcrumbLd(crumbs), faqPageLd(items)]} />
      <PageHeader
        crumbs={
          <Breadcrumbs
            label={d.common.menu}
            items={[{ name: crumbs[0]!.name, href: localePath(lang, '/') }, { name: crumbs[1]!.name, href: localePath(lang, '/faq') }]}
          />
        }
        h1={d.faq.h1}
        lead={d.faq.lead}
      />
      <Section className="pt-0">
        <Container>
          <FaqGroupNav groups={groups} label={d.faq.groupsLabel} />
        </Container>
      </Section>
      {groups.map((group) => (
        <FaqGroupSection key={group.id} group={group} />
      ))}
      <FaqCta title={d.faq.ctaTitle} text={d.faq.ctaText} button={d.faq.ctaButton} />
    </>
  );
}
