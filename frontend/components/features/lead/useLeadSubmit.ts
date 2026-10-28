import { useRef, useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/api/leads';
import type { LeadDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { buildLeadPayload, type LeadFormValues } from '@/lib/leads/build';
import { fieldErrorsFrom, type FieldErrors } from '@/lib/leads/errors';
import { validateLead } from '@/lib/leads/validate';
import type { LeadSubmitResult } from '@/types/lead';
import type { LeadOutcome } from './LeadStatus';

interface Options {
  lang: Lang;
  product: string;
  pageUrl: string;
  labels: LeadDict;
}

function outcomeOf(result: LeadSubmitResult): LeadOutcome {
  return result.ok ? 'success' : result.reason;
}

function valuesOf(data: FormData): LeadFormValues {
  return {
    name: String(data.get('name') ?? ''),
    contact: String(data.get('contact') ?? ''),
    channel: String(data.get('channel') ?? ''),
    message: String(data.get('message') ?? ''),
    website: String(data.get('website') ?? ''),
  };
}

/** Form state and submit flow: validate like the backend, send through lib/api/leads, map the result. */
export function useLeadSubmit({ lang, product, pageUrl, labels }: Options) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [outcome, setOutcome] = useState<LeadOutcome>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const payload = buildLeadPayload(
      valuesOf(new FormData(event.currentTarget)),
      { product, pageUrl, lang },
    );
    const checked = validateLead(payload);
    if (!checked.ok) {
      setErrors(fieldErrorsFrom(checked.fields, labels.errors, labels.invalid));
      setOutcome('invalid');
      return;
    }
    setErrors({});
    setOutcome('sending');
    const result = await submitLead(payload);
    if (result.ok) formRef.current?.reset();
    if (!result.ok && result.reason === 'invalid') {
      setErrors(fieldErrorsFrom(result.fields, labels.errors, labels.invalid));
    }
    setOutcome(outcomeOf(result));
  }

  return { formRef, errors, outcome, onSubmit };
}
