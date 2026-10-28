import type { LeadDict } from '@/lib/i18n/dict/types';
import type { LeadField } from '@/types/lead';

export type FieldErrors = Partial<Record<LeadField, string>>;

const FORM_FIELDS: readonly LeadField[] = ['name', 'contact', 'channel', 'message'];

/**
 * Maps invalid field names from the route to the page-language message. Names that are not form fields
 * (for example the product slug) show the generic "check the form" text under the message box.
 */
export function fieldErrorsFrom(fields: string[], messages: LeadDict['errors'], fallback: string): FieldErrors {
  const out: FieldErrors = {};
  for (const field of fields) {
    if ((FORM_FIELDS as readonly string[]).includes(field)) {
      out[field as LeadField] = messages[field as LeadField];
    }
  }
  if (Object.keys(out).length === 0 && fields.length > 0) out.message = fallback;
  return out;
}
