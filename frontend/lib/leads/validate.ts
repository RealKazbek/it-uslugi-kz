import { isLang, type Lang } from '@/lib/i18n/locales';
import { CHANNELS, type Channel, type LeadField, type LeadPayload } from '@/types/lead';

export const NAME_MIN = 2;
export const NAME_MAX = 80;
export const CONTACT_MIN = 3;
export const CONTACT_MAX = 100;
export const MESSAGE_MAX = 2000;
const PRODUCT_SLUG = /^[a-z0-9-]{1,120}$/;
const PAGE_URL_MAX = 500;

export type LeadValidation = { ok: true; value: LeadPayload } | { ok: false; fields: string[] };

function text(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === 'string' ? value : '';
}

function isChannel(value: string): value is Channel {
  return (CHANNELS as readonly string[]).includes(value);
}

/** Validates the lead body shared by the website form and the route handler. Returns field names only. */
export function validateLead(input: unknown): LeadValidation {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false, fields: ['body'] };
  }
  const record = input as Record<string, unknown>;
  const name = text(record, 'name').trim();
  const contact = text(record, 'contact').trim();
  const message = text(record, 'message').trim();
  const channel = text(record, 'channel');
  const product = text(record, 'product').trim();
  const pageUrl = text(record, 'page_url').trim();
  const lang = text(record, 'lang');

  const fields: string[] = [];
  if (name.length < NAME_MIN || name.length > NAME_MAX) fields.push('name');
  if (contact.length < CONTACT_MIN || contact.length > CONTACT_MAX) fields.push('contact');
  if (!isChannel(channel)) fields.push('channel');
  if (message.length > MESSAGE_MAX) fields.push('message');
  if (product !== '' && !PRODUCT_SLUG.test(product)) fields.push('product');
  if (pageUrl.length > PAGE_URL_MAX) fields.push('page_url');
  if (!isLang(lang)) fields.push('lang');
  if (fields.length > 0 || !isChannel(channel) || !isLang(lang)) {
    return { ok: false, fields };
  }

  return {
    ok: true,
    value: {
      name,
      contact,
      channel,
      message,
      product,
      page_url: pageUrl,
      lang: lang as Lang,
      website: text(record, 'website'),
    },
  };
}

/** Field-level check for the form before submit. Same rules as validateLead. */
export function invalidFields(input: unknown): LeadField[] {
  const result = validateLead(input);
  if (result.ok) return [];
  return result.fields.filter((f): f is LeadField => ['name', 'contact', 'channel', 'message'].includes(f));
}
