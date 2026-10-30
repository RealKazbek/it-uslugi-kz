'use client';

import { Loader2, Send } from 'lucide-react';
import { useId } from 'react';
import { ChannelField } from './ChannelField';
import { ContactField } from './ContactField';
import { Honeypot } from './Honeypot';
import { LeadStatus, type LeadOutcome } from './LeadStatus';
import { MessageField } from './MessageField';
import { NameField } from './NameField';
import { useLeadSubmit } from './useLeadSubmit';
import { Button } from '@/components/ui/Button';
import type { LeadDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';

interface LeadFormProps {
  lang: Lang;
  product: string;
  pageUrl: string;
  labels: LeadDict;
}

function messageFor(outcome: LeadOutcome, labels: LeadDict): string {
  if (outcome === 'success') return labels.success;
  if (outcome === 'throttled') return labels.throttled;
  if (outcome === 'error') return labels.error;
  return labels.invalid;
}

/** Lead form. Field components show the errors; the hook owns validation and sending. */
export function LeadForm({ lang, product, pageUrl, labels }: LeadFormProps) {
  const ids = { name: useId(), contact: useId(), channel: useId(), message: useId() };
  const { formRef, errors, outcome, onSubmit } = useLeadSubmit({ lang, product, pageUrl, labels });
  const sending = outcome === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4">
      <NameField id={ids.name} label={labels.labels.name} placeholder={labels.placeholders.name} error={errors.name} />
      <ContactField id={ids.contact} label={labels.labels.contact} placeholder={labels.placeholders.contact} error={errors.contact} />
      <ChannelField id={ids.channel} label={labels.labels.channel} channelNames={labels.channels} />
      <MessageField id={ids.message} label={labels.labels.message} placeholder={labels.placeholders.message} error={errors.message} />
      <Honeypot />
      <Button type="submit" size="lg" disabled={sending}>
        {sending ? <Loader2 aria-hidden="true" className="size-5 animate-spin" /> : <Send aria-hidden="true" className="size-5" />}
        {sending ? labels.sending : labels.submit}
      </Button>
      <LeadStatus outcome={outcome} text={messageFor(outcome, labels)} />
    </form>
  );
}
