import { Star } from 'lucide-react';
import { cn } from '@/lib/ui/cn';

const SCALE = [1, 2, 3, 4, 5] as const;

/** Five stars, filled up to the rating. The whole group is one image for assistive tech. */
export function ReviewStars({ rating, label }: { rating: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="inline-flex gap-0.5 text-primary">
      {SCALE.map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={cn('size-4', star <= rating ? 'fill-current' : 'text-border')}
        />
      ))}
    </span>
  );
}
