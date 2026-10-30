import { isCompleteKzPhone } from './phoneMask';
import { validateLead, type LeadValidation } from './validate';
import type { LeadPayload } from '@/types/lead';

/** Form-side check: the route's rules plus a complete Kazakhstan phone in the contact field. */
export function validateLeadForm(payload: LeadPayload): LeadValidation {
  const checked = validateLead(payload);
  const phoneOk = isCompleteKzPhone(payload.contact);
  if (checked.ok) return phoneOk ? checked : { ok: false, fields: ['contact'] };
  if (phoneOk || checked.fields.includes('contact')) return checked;
  return { ok: false, fields: [...checked.fields, 'contact'] };
}
