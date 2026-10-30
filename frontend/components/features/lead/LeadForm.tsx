'use client';

import { Loader2, Send } from 'lucide-react';
import { useId, useState } from 'react';
import { ChannelField } from './ChannelField';
import { ContactField } from './ContactField';
import { Honeypot } from './Honeypot';
import { LeadStatus, type LeadOutcome } from './LeadStatus';
import { MessageField } from './MessageField';
import { useLeadProducts } from './LeadModalProvider';
import { NameField } from './NameField';
import { ServiceField, type ProductOption } from './ServiceField';
import { useLeadSubmit } from './useLeadSubmit';
import { Button } from '@/components/ui/Button';
import type { LeadDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';

interface LeadFormProps {
  lang: Lang;
  /** Slug used when there is no service select (and as the select's preselected value). */
  product: string;
  pageUrl: string;
  labels: LeadDict;
  /** Products for the service select. Defaults to the site-wide list from the provider; an empty list hides the select. */
  products?: ProductOption[];
  onSuccess?: () => void;
}

function messageFor(outcome: LeadOutcome, labels: LeadDict): string {
  if (outcome === 'success') return labels.success;
  if (outcome === 'throttled') return labels.throttled;
  if (outcome === 'error') return labels.error;
  return labels.invalid;
}

/** Lead form. Field components show the errors; the hook owns validation and sending. */
export function LeadForm({ lang, product, pageUrl, labels, products: productsProp, onSuccess }: LeadFormProps) {
  const contextProducts = useLeadProducts();
  const products = productsProp ?? contextProducts;
  const ids = { name: useId(), contact: useId(), product: useId(), message: useId() };
  const [contact, setContact] = useState('');
  const { formRef, errors, outcome, onSubmit } = useLeadSubmit({
    lang,
    product,
    pageUrl,
    labels,
    onSuccess: () => {
      setContact('');
      onSuccess?.();
    },
  });
  const sending = outcome === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4">
      <NameField id={ids.name} label={labels.labels.name} placeholder={labels.placeholders.name} error={errors.name} />
      <ContactField
        id={ids.contact}
        label={labels.labels.contact}
        placeholder={labels.placeholders.contact}
        value={contact}
        onChange={setContact}
        error={errors.contact}
      />
      {products.length > 0 && (
        <ServiceField
          id={ids.product}
          label={labels.labels.service}
          notSelected={labels.notSelected}
          products={products}
          defaultValue={product}
        />
      )}
      <ChannelField label={labels.labels.channel} channelNames={labels.channels} />
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
