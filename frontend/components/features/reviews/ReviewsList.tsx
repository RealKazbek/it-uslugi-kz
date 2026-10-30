import type { ReviewDto } from '@/types/api';
import { ReviewCard } from './ReviewCard';

interface ReviewsListProps {
  reviews: ReviewDto[];
  ratingLabel: (rating: number) => string;
}

/** Grid of approved reviews. Renders nothing for an empty list; the page decides what to show instead. */
export function ReviewsList({ reviews, ratingLabel }: ReviewsListProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <li key={review.id} className="flex">
          <ReviewCard review={review} ratingLabel={ratingLabel} />
        </li>
      ))}
    </ul>
  );
}
