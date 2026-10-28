'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/api/leads';
import { buildLeadPayload } from '@/lib/leads/build';
import { validateLead } from '@/lib/leads/validate';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { CHANNELS, type LeadField, type LeadSubmitResult } from '@/types/lead';

interface LeadFormProps {
  lang: Lang;
  product: string;
  pageUrl: string;
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done'; result: LeadSubmitResult };
type Errors = Partial<Record<LeadField, string>>;

/** Lead form: validates like the backend, sends through lib/api/leads, shows the page-language result. */
export function LeadForm({ lang, product, pageUrl }: LeadFormProps) {
  const d = getDict(lang).lead;
  const ids = { name: useId(), contact: useId(), channel: useId(), message: useId() };
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = buildLeadPayload(
      {
        name: String(data.get('name') ?? ''),
        contact: String(data.get('contact') ?? ''),
        channel: String(data.get('channel') ?? ''),
        message: String(data.get('message') ?? ''),
        website: String(data.get('website') ?? ''),
      },
      { product, pageUrl, lang },
    );
    const checked = validateLead(payload);
    if (!checked.ok) {
      setErrors(toErrors(checked.fields, d.errors, d.invalid));
      setStatus({ kind: 'done', result: { ok: false, reason: 'invalid', fields: [] } });
      return;
    }
    setErrors({});
    setStatus({ kind: 'sending' });
    const result = await submitLead(payload);
    if (result.ok) formRef.current?.reset();
    if (!result.ok && result.reason === 'invalid') setErrors(toErrors(result.fields, d.errors, d.invalid));
    setStatus({ kind: 'done', result });
  }

  const sending = status.kind === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4 md:max-w-xl">
      <div>
        <label htmlFor={ids.name} className="block font-semibold">{d.labels.name}</label>
        <input id={ids.name} name="name" type="text" required minLength={2} maxLength={80} autoComplete="name"
          placeholder={d.placeholders.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${ids.name}-err` : undefined}
          className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-ink" />
        {errors.name && <p id={`${ids.name}-err`} className="mt-1 text-sm text-ink">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={ids.contact} className="block font-semibold">{d.labels.contact}</label>
        <input id={ids.contact} name="contact" type="text" required minLength={3} maxLength={100} autoComplete="off"
          placeholder={d.placeholders.contact} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? `${ids.contact}-err` : undefined}
          className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-ink" />
        {errors.contact && <p id={`${ids.contact}-err`} className="mt-1 text-sm text-ink">{errors.contact}</p>}
      </div>
      <div>
        <label htmlFor={ids.channel} className="block font-semibold">{d.labels.channel}</label>
        <select id={ids.channel} name="channel" defaultValue="whatsapp"
          className="mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-ink">
          {CHANNELS.map((channel) => (
            <option key={channel} value={channel}>{d.channels[channel]}</option>
          ))}
        </select>
        {errors.channel && <p className="mt-1 text-sm text-ink">{errors.channel}</p>}
      </div>
      <div>
        <label htmlFor={ids.message} className="block font-semibold">{d.labels.message}</label>
        <textarea id={ids.message} name="message" rows={4} maxLength={2000} placeholder={d.placeholders.message}
          aria-invalid={Boolean(errors.message)}
          className="mt-1 w-full rounded-lg border border-line bg-paper px-3 py-2 text-ink" />
        {errors.message && <p className="mt-1 text-sm text-ink">{errors.message}</p>}
      </div>
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" disabled={sending}
        className="min-h-11 rounded-lg bg-tg px-5 font-semibold text-tgtext disabled:opacity-60">
        {sending ? d.sending : d.submit}
      </button>
      <LeadStatusMessage status={status} lang={lang} />
    </form>
  );
}

function toErrors(fields: string[], messages: Record<LeadField, string>, fallback: string): Errors {
  const out: Errors = {};
  for (const field of fields) {
    if (field === 'name' || field === 'contact' || field === 'channel' || field === 'message') {
      out[field] = messages[field];
    }
  }
  if (Object.keys(out).length === 0 && fields.length > 0) out.message = fallback;
  return out;
}

function LeadStatusMessage({ status, lang }: { status: Status; lang: Lang }) {
  const d = getDict(lang).lead;
  if (status.kind !== 'done') return null;
  const { result } = status;
  if (result.ok) return <p role="status" className="font-semibold text-ok">{d.success}</p>;
  if (result.reason === 'throttled') return <p role="alert" className="text-ink">{d.throttled}</p>;
  if (result.reason === 'invalid') return <p role="alert" className="text-ink">{d.invalid}</p>;
  return <p role="alert" className="text-ink">{d.error}</p>;
}
