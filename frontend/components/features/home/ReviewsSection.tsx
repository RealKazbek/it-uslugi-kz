import { ReviewsList } from '@/components/features/reviews/ReviewsList';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import type { ReviewDto } from '@/types/api';
import { SectionHeading } from './SectionHeading';

export const HOME_REVIEWS_COUNT = 3;

interface ReviewsSectionProps {
  title: string;
  lead: string;
  reviews: ReviewDto[];
  allLabel: string;
  allHref: string;
  ratingLabel: (rating: number) => string;
}

/** Up to three approved reviews with a link to the full list. Rendered only when there are reviews. */
export function ReviewsSection({ title, lead, reviews, allLabel, allHref, ratingLabel }: ReviewsSectionProps) {
  return (
    <Section labelledBy="reviews">
      <Container className="space-y-10">
        <SectionHeading id="reviews" title={title} lead={lead} link={{ href: allHref, label: allLabel }} />
        <ReviewsList reviews={reviews.slice(0, HOME_REVIEWS_COUNT)} ratingLabel={ratingLabel} />
      </Container>
    </Section>
  );
}
