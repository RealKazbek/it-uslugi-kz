import { useRef, useState, type FormEvent } from 'react';
import { submitReview } from '@/lib/api/reviews';
import type { ReviewsDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { reviewErrorsFrom, type ReviewErrors } from '@/lib/reviews/errors';
import { validateReview } from '@/lib/reviews/validate';
import type { ReviewSubmitResult } from '@/types/review';
import type { LeadOutcome } from '@/components/features/lead/LeadStatus';

interface Options {
  lang: Lang;
  labels: ReviewsDict;
}

function outcomeOf(result: ReviewSubmitResult): LeadOutcome {
  return result.ok ? 'success' : result.reason;
}

function valuesOf(data: FormData, lang: Lang): Record<string, unknown> {
  return {
    name: String(data.get('name') ?? ''),
    company: String(data.get('company') ?? ''),
    city: String(data.get('city') ?? ''),
    rating: String(data.get('rating') ?? ''),
    text: String(data.get('text') ?? ''),
    website: String(data.get('website') ?? ''),
    locale: lang,
  };
}

/** Review form state: validate like the backend, send through lib/api/reviews, map the result. */
export function useReviewSubmit({ lang, labels }: Options) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [outcome, setOutcome] = useState<LeadOutcome>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const checked = validateReview(valuesOf(new FormData(event.currentTarget), lang));
    if (!checked.ok) {
      setErrors(reviewErrorsFrom(checked.fields, labels));
      setOutcome('invalid');
      return;
    }
    setErrors({});
    setOutcome('sending');
    const result = await submitReview(checked.value);
    if (result.ok) formRef.current?.reset();
    if (!result.ok && result.reason === 'invalid') {
      setErrors(reviewErrorsFrom(result.fields, labels));
    }
    setOutcome(outcomeOf(result));
  }

  return { formRef, errors, outcome, onSubmit };
}
