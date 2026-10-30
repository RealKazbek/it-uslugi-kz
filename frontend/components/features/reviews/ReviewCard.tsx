import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import type { ReviewDto } from '@/types/api';
import { ReviewStars } from './ReviewStars';

interface ReviewCardProps {
  review: ReviewDto;
  ratingLabel: (rating: number) => string;
}

/** One approved review: stars, author, company and city, then the text. */
export function ReviewCard({ review, ratingLabel }: ReviewCardProps) {
  const origin = [review.company, review.city].filter((part) => part !== '').join(' · ');
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="gap-3">
        <ReviewStars rating={review.rating} label={ratingLabel(review.rating)} />
        <div>
          <p className="font-semibold text-foreground">{review.name}</p>
          {origin !== '' && <p className="text-sm text-muted-foreground">{origin}</p>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="whitespace-pre-line text-foreground">{review.text}</p>
      </CardContent>
    </Card>
  );
}
