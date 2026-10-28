import type { Lang } from '@/lib/i18n/locales';
import type { Channel, LeadPayload } from '@/types/lead';

export interface LeadFormValues {
  name: string;
  contact: string;
  channel: string;
  message: string;
  website: string;
}

export interface LeadHidden {
  product: string;
  pageUrl: string;
  lang: Lang;
}

/** Builds the request body from the visible fields and the hidden product/page/lang values. */
export function buildLeadPayload(values: LeadFormValues, hidden: LeadHidden): LeadPayload {
  return {
    name: values.name,
    contact: values.contact,
    channel: values.channel as Channel,
    message: values.message,
    product: hidden.product,
    page_url: hidden.pageUrl,
    lang: hidden.lang,
    website: values.website,
  };
}
