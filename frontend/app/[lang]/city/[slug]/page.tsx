import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CityCatalogLinks } from '@/components/features/city/CityCatalogLinks';
import { CityFocus } from '@/components/features/city/CityFocus';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FaqList } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';
import { cityParams, loadCityView } from '@/lib/city/load';
import { isCityLang } from '@/lib/city/types';
import { config } from '@/lib/config';
import { getDict } from '@/lib/i18n/dict';
import { parseLang } from '@/lib/catalog/params';
import { whatsappGeneralLink } from '@/lib/format/links';
import { localePath } from '@/lib/i18n/paths';
import { absoluteUrl } from '@/lib/seo/urls';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbLd, faqPageLd } from '@/lib/seo/jsonld';
import type { Lang } from '@/lib/i18n/locales';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams(): Promise<{ lang: Lang; slug: string }[]> {
  return cityParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null || !isCityLang(lang)) return {};
  const view = await loadCityView(lang, slug);
  if (view === null) return {};
  return buildPageMetadata({
    siteUrl: config.siteUrl,
    lang,
    path: `/city/${slug}`,
    title: view.title,
    description: view.description,
    langs: ['ru', 'kk'],
  });
}

export default async function CityPage({ params }: PageProps) {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null || !isCityLang(lang)) notFound();
  const view = await loadCityView(lang, slug);
  if (view === null) notFound();
  const d = getDict(lang);
  const home = { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') };
  const here = { name: view.name, url: absoluteUrl(config.siteUrl, lang, `/city/${slug}`) };

  return (
    <>
      <JsonLd data={[breadcrumbLd([home, here]), faqPageLd(view.faq)]} />
      <Section>
        <Container className="space-y-5">
          <Breadcrumbs label={d.common.menu} items={[{ name: home.name, href: localePath(lang, '/') }, { name: view.name, href: localePath(lang, `/city/${slug}`) }]} />
          <h1 className="text-[1.9rem] leading-tight md:text-[2.4rem]">{view.h1}</h1>
          <p className="max-w-prose text-lg">{view.intro}</p>
          <p className="max-w-prose text-muted">{view.remote}</p>
          <ButtonLink href={whatsappGeneralLink(lang)}>{d.home.ctaWhatsapp}</ButtonLink>
        </Container>
      </Section>
      <Section labelledBy="focus">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div className="space-y-2">
            <h2 id="focus" className="text-2xl">{view.focusHeading}</h2>
            <p className="text-muted">{view.focusLead}</p>
          </div>
          <CityFocus items={view.focus} />
        </Container>
      </Section>
      <Section labelledBy="catalog">
        <Container className="space-y-6">
          <h2 id="catalog" className="text-2xl">{view.catalogHeading}</h2>
          <CityCatalogLinks groups={view.catalogGroups} />
        </Container>
      </Section>
      <Section labelledBy="nearby">
        <Container className="space-y-4">
          <h2 id="nearby" className="text-2xl">{view.nearbyHeading}</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {view.nearby.map((city) => (
              <li key={city.href}>
                <Link href={city.href} className="font-semibold">{city.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section labelledBy="faq">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="faq" className="text-2xl">{view.faqHeading}</h2>
          <FaqList items={view.faq} />
        </Container>
      </Section>
    </>
  );
}
