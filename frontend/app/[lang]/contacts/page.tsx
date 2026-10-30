import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { LeadForm } from '@/components/features/lead/LeadForm';
import { ContactList, type ContactItem } from '@/components/features/contacts/ContactList';
import { HowBlock } from '@/components/features/contacts/HowBlock';
import { PersonBlock } from '@/components/features/contacts/PersonBlock';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { contacts } from '@/lib/site/contacts';
import { person } from '@/lib/site/person';
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

function contactItems(lang: Parameters<typeof getDict>[0]): ContactItem[] {
  const labels = getDict(lang).contacts.labels;
  const phone = lang === 'en' ? contacts.phoneDisplayIntl : contacts.phoneDisplay;
  return [
    { label: labels.wa, href: whatsappGeneralLink(lang), text: labels.wa, external: true, icon: 'whatsapp' },
    { label: labels.tg, href: telegramLink(), text: `@${contacts.telegram}`, external: true, icon: 'telegram' },
    { label: labels.phone, href: `tel:${contacts.phone}`, text: phone, external: false, icon: 'phone' },
    { label: labels.email, href: `mailto:${contacts.email}`, text: contacts.email, external: false, icon: 'mail' },
    { label: labels.site, href: contacts.portfolioUrl, text: contacts.portfolioUrl.replace('https://', ''), external: true, icon: 'site' },
    { label: labels.gh, href: contacts.github, text: 'RealKazbek', external: true, icon: 'github' },
  ];
}

export default async function ContactsPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const pageUrl = absoluteUrl(config.siteUrl, lang, '/contacts');
  const home = { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') };
  const here = { name: d.common.nav.contacts, url: pageUrl };

  return (
    <>
      <JsonLd data={[professionalServiceLd(config.siteUrl), breadcrumbLd([home, here])]} />
      <PageHeader
        crumbs={<Breadcrumbs label={d.common.menu} items={[{ name: home.name, href: localePath(lang, '/') }, { name: here.name, href: localePath(lang, '/contacts') }]} />}
        h1={d.contacts.h1}
        lead={d.contacts.lead}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={whatsappGeneralLink(lang)} variant="whatsapp">
            <SiWhatsapp aria-hidden="true" />
            {d.common.wa}
          </ButtonLink>
          <ButtonLink href={telegramLink()} variant="telegram">
            <SiTelegram aria-hidden="true" />
            {d.common.tg}
          </ButtonLink>
        </div>
      </PageHeader>
      <Section labelledBy="where" className="bg-muted">
        <Container className="space-y-8">
          <h2 id="where" className="text-3xl font-extrabold">{d.contacts.where}</h2>
          <ContactList items={contactItems(lang)} />
        </Container>
      </Section>
      <PersonBlock heading={d.contacts.who} name={person.name[lang]} role={person.role[lang]} facts={person.facts[lang]} />
      <HowBlock lang={lang} howHeading={d.contacts.how} howLines={d.contacts.howLines} legalHeading={d.contacts.legal} />
      <Section labelledBy="form" className="pb-24 md:pb-14">
        <Container className="space-y-5">
          <h2 id="form" className="text-3xl font-extrabold">{d.contacts.formTitle}</h2>
          <p className="max-w-prose text-lg text-muted-foreground">{d.contacts.formText}</p>
          <LeadForm lang={lang} product="" pageUrl={pageUrl} labels={d.lead} />
        </Container>
      </Section>
    </>
  );
}
