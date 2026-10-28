import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LeadForm } from '@/components/features/lead/LeadForm';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { contacts } from '@/lib/site/contacts';
import { person } from '@/lib/site/person';
import { legal } from '@/lib/site/legal';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbLd, professionalServiceLd } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/lib/seo/urls';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  if (lang === null) return {};
  const d = getDict(lang).contacts;
  return buildPageMetadata({ siteUrl: config.siteUrl, lang, path: '/contacts', title: d.title, description: d.description, langs: LANGS });
}

export default async function ContactsPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const pageUrl = absoluteUrl(config.siteUrl, lang, '/contacts');
  const home = { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') };
  const here = { name: d.common.nav.contacts, url: pageUrl };
  const phone = lang === 'en' ? contacts.phoneDisplayIntl : contacts.phoneDisplay;

  return (
    <>
      <JsonLd data={[professionalServiceLd(config.siteUrl), breadcrumbLd([home, here])]} />
      <Section>
        <Container className="space-y-5">
          <Breadcrumbs label={d.common.menu} items={[{ name: home.name, href: localePath(lang, '/') }, { name: here.name, href: localePath(lang, '/contacts') }]} />
          <h1 className="text-[1.9rem] md:text-[2.4rem]">{d.contacts.h1}</h1>
          <p className="max-w-prose text-lg text-muted">{d.contacts.lead}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={whatsappGeneralLink(lang)}>{d.common.wa}</ButtonLink>
            <ButtonLink href={telegramLink()} variant="outline">{d.common.tg}</ButtonLink>
          </div>
        </Container>
      </Section>
      <Section labelledBy="where">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="where" className="text-2xl">{d.contacts.where}</h2>
          <ul className="space-y-2">
            <li>{d.contacts.labels.wa}: <a href={whatsappGeneralLink(lang)} target="_blank" rel="noopener noreferrer">{d.contacts.labels.wa}</a></li>
            <li>{d.contacts.labels.tg}: <a href={telegramLink()} target="_blank" rel="noopener noreferrer">@{contacts.telegram}</a></li>
            <li>{d.contacts.labels.phone}: <a href={`tel:${contacts.phone}`}>{phone}</a></li>
            <li>{d.contacts.labels.email}: <a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
            <li>{d.contacts.labels.site}: <a href={contacts.portfolioUrl} target="_blank" rel="noopener noreferrer">{contacts.portfolioUrl.replace('https://', '')}</a></li>
            <li>{d.contacts.labels.gh}: <a href={contacts.github} target="_blank" rel="noopener noreferrer">RealKazbek</a></li>
          </ul>
        </Container>
      </Section>
      <Section labelledBy="who">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="who" className="text-2xl">{d.contacts.who}</h2>
          <div className="space-y-2">
            <p><strong>{person.name[lang]}</strong>, {person.role[lang]}.</p>
            <ul className="list-disc space-y-1 pl-5">
              {person.facts[lang].map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <Section labelledBy="how">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="how" className="text-2xl">{d.contacts.how}</h2>
          <ul className="max-w-prose list-disc space-y-2 pl-5">
            {d.contacts.howLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section labelledBy="legal">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="legal" className="text-2xl">{d.contacts.legal}</h2>
          <p className="max-w-prose">{legal[lang]}</p>
        </Container>
      </Section>
      <Section labelledBy="form" className="pb-24 md:pb-14">
        <Container className="space-y-5">
          <h2 id="form" className="text-2xl">{d.contacts.formTitle}</h2>
          <p className="max-w-prose text-muted">{d.contacts.formText}</p>
          <LeadForm lang={lang} product="" pageUrl={pageUrl} />
        </Container>
      </Section>
    </>
  );
}
