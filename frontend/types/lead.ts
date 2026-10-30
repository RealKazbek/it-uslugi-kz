import type { Lang } from '@/lib/i18n/locales';

export const CHANNELS = ['whatsapp', 'telegram', 'phone', 'email'] as const;
export type Channel = (typeof CHANNELS)[number];

/** Channels offered in the website form. Email stays valid for the backend but is not offered. */
export const FORM_CHANNELS = ['whatsapp', 'telegram', 'phone'] as const satisfies readonly Channel[];

/** Body the website form sends to /api/lead; the route forwards it to the backend /api/leads. */
export interface LeadPayload {
  name: string;
  contact: string;
  channel: Channel;
  message: string;
  product: string;
  page_url: string;
  lang: Lang;
  website: string;
}

/** Form field names that can carry a validation error. */
export type LeadField = 'name' | 'contact' | 'channel' | 'message';

export type LeadSubmitResult =
  | { ok: true }
  | { ok: false; reason: 'throttled' }
  | { ok: false; reason: 'invalid'; fields: LeadField[] }
  | { ok: false; reason: 'error' };
