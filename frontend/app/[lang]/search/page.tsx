import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SearchResults } from '@/components/features/search/SearchResults';
import { SearchPageForm } from '@/components/features/search/SearchPageForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { parseLang } from '@/lib/catalog/params';
import { getDict } from '@/lib/i18n/dict';
import { localePath } from '@/lib/i18n/paths';
import { parseSearchQuery } from '@/lib/search/query';

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  if (lang === null) return {};
  const d = getDict(lang).search;
  // Results pages are for people, not the index: never indexed, links not followed.
  return { title: d.pageMetaTitle, description: d.pageMetaDescription, robots: { index: false, follow: false } };
}

/** /search?q=...: the same engine as the palette, rendered on the server. */
export default async function SearchPage({ params, searchParams }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const query = parseSearchQuery((await searchParams).q);
  const d = getDict(lang);

  return (
    <>
      <PageHeader
        crumbs={
          <Breadcrumbs
            label={d.common.menu}
            items={[
              { name: d.common.breadcrumbHome, href: localePath(lang, '/') },
              { name: d.search.pageTitle, href: localePath(lang, '/search') },
            ]}
          />
        }
        h1={d.search.pageTitle}
        lead={d.search.pageLead}
      >
        <SearchPageForm query={query} labels={{ placeholder: d.search.placeholder, pageSubmit: d.search.pageSubmit, label: d.search.label }} />
      </PageHeader>
      <Section>
        <Container>
          <SearchResults lang={lang} query={query} />
        </Container>
      </Section>
    </>
  );
}
