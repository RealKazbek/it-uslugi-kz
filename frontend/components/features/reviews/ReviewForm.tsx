'use client';

import { Loader2, Send } from 'lucide-react';
import { useId } from 'react';
import { FieldShell, INPUT_CLASS, describedBy } from '@/components/features/lead/FieldShell';
import { Honeypot } from '@/components/features/lead/Honeypot';
import { LeadStatus, type LeadOutcome } from '@/components/features/lead/LeadStatus';
import { Button } from '@/components/ui/Button';
import type { ReviewsDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { ReviewRating } from './ReviewRating';
import { useReviewSubmit } from './useReviewSubmit';

interface ReviewFormProps {
  lang: Lang;
  labels: ReviewsDict;
}

function messageFor(outcome: LeadOutcome, labels: ReviewsDict): string {
  if (outcome === 'success') return labels.success;
  if (outcome === 'throttled') return labels.throttled;
  if (outcome === 'error') return labels.error;
  return labels.invalid;
}

/** Client review form. Errors are shown per field; the hook owns validation and sending. */
export function ReviewForm({ lang, labels }: ReviewFormProps) {
  const ids = { name: useId(), company: useId(), city: useId(), text: useId(), rating: useId() };
  const { formRef, errors, outcome, onSubmit } = useReviewSubmit({ lang, labels });
  const sending = outcome === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5">
      <FieldShell id={ids.name} label={labels.labels.name} error={errors.name}>
        <input
          id={ids.name}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          placeholder={labels.placeholders.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy(ids.name, errors.name)}
          className={INPUT_CLASS}
        />
      </FieldShell>
      <FieldShell id={ids.company} label={labels.labels.company} error={errors.company}>
        <input
          id={ids.company}
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={100}
          placeholder={labels.placeholders.company}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={describedBy(ids.company, errors.company)}
          className={INPUT_CLASS}
        />
      </FieldShell>
      <FieldShell id={ids.city} label={labels.labels.city} error={errors.city}>
        <input
          id={ids.city}
          name="city"
          type="text"
          maxLength={100}
          placeholder={labels.placeholders.city}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={describedBy(ids.city, errors.city)}
          className={INPUT_CLASS}
        />
      </FieldShell>
      <ReviewRating
        idPrefix={ids.rating}
        legend={labels.labels.rating}
        error={errors.rating}
        ratingLabel={labels.ratingLabel}
      />
      <FieldShell id={ids.text} label={labels.labels.text} error={errors.text}>
        <textarea
          id={ids.text}
          name="text"
          rows={5}
          maxLength={2000}
          placeholder={labels.placeholders.text}
          aria-invalid={Boolean(errors.text)}
          aria-describedby={describedBy(ids.text, errors.text)}
          className={`${INPUT_CLASS} min-h-32 py-2`}
        />
      </FieldShell>
      <Honeypot />
      <Button type="submit" size="lg" disabled={sending}>
        {sending ? <Loader2 aria-hidden="true" className="size-5 animate-spin" /> : <Send aria-hidden="true" className="size-5" />}
        {sending ? labels.sending : labels.submit}
      </Button>
      <LeadStatus outcome={outcome} text={messageFor(outcome, labels)} />
    </form>
  );
}
