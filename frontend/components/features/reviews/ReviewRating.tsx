import { cn } from '@/lib/ui/cn';

const SCALE = [1, 2, 3, 4, 5] as const;

interface ReviewRatingProps {
  legend: string;
  error?: string;
  /** Prefix for radio ids, unique per form instance. */
  idPrefix: string;
  /** Used for the 1..5 radio labels, for example "Rated 3 out of 5". */
  ratingLabel: (rating: number) => string;
}

/** Five radio buttons in one fieldset. Keyboard arrows move between them. */
export function ReviewRating({ legend, error, idPrefix, ratingLabel }: ReviewRatingProps) {
  return (
    <fieldset aria-invalid={Boolean(error)} aria-describedby={error ? `${idPrefix}-error` : undefined}>
      <legend className="text-sm font-semibold">{legend}</legend>
      <div className="mt-1.5 flex gap-2">
        {SCALE.map((rating) => (
          <label
            key={rating}
            className={cn(
              'flex size-11 cursor-pointer items-center justify-center rounded-lg border border-input bg-background font-semibold',
              'has-[:checked]:border-primary has-[:checked]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
            )}
          >
            <input
              type="radio"
              name="rating"
              value={rating}
              aria-label={ratingLabel(rating)}
              className="sr-only"
            />
            <span aria-hidden="true">{rating}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${idPrefix}-error`} className="mt-1.5 text-sm font-medium text-primary">
          {error}
        </p>
      )}
    </fieldset>
  );
}
