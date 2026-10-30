import { ratingText } from '@/lib/reviews/rating';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReviewForm } from '@/components/features/reviews/ReviewForm';
import { ReviewsList } from '@/components/features/reviews/ReviewsList';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { getReviewsSafe } from '@/lib/api/reviews';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
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
  const d = getDict(lang).reviews;
  return buildPageMetadata({ siteUrl: config.siteUrl, lang, path: '/reviews', title: d.title, description: d.description, langs: LANGS });
}

export default async function ReviewsPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const data = await getReviewsSafe();
  const crumbs = [
    { name: d.common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') },
    { name: d.common.nav.reviews, url: absoluteUrl(config.siteUrl, lang, '/reviews') },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHeader
        crumbs={
          <Breadcrumbs
            label={d.common.menu}
            items={[{ name: crumbs[0]!.name, href: localePath(lang, '/') }, { name: crumbs[1]!.name, href: localePath(lang, '/reviews') }]}
          />
        }
        h1={d.reviews.h1}
        lead={d.reviews.lead}
      />
      <Section className="pt-0">
        <Container className="space-y-8">
          {data.results.length > 0 ? (
            <ReviewsList reviews={data.results} ratingLabel={(rating) => ratingText(d.reviews.ratingLabel, rating)} />
          ) : (
            <p className="text-lg text-muted-foreground">{d.reviews.emptyText}</p>
          )}
          {data.gis_url !== '' && (
            <ButtonLink href={data.gis_url} variant="outline">
              {d.reviews.gisLabel}
            </ButtonLink>
          )}
        </Container>
      </Section>
      <Section className="bg-muted" labelledBy="leave-review">
        <Container>
          <Card className="mx-auto max-w-2xl space-y-6 p-6 md:p-8">
            <h2 id="leave-review" className="text-h3">{d.reviews.formTitle}</h2>
            <ReviewForm lang={lang} labels={d.reviews} />
          </Card>
        </Container>
      </Section>
    </>
  );
}
