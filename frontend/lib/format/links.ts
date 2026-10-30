import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { contacts } from '@/lib/site/contacts';

/** WhatsApp chat link with a prefilled text (primary CTA). */
export function whatsappLink(text: string): string {
  return `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Prefilled product message with the product name and the absolute page URL. */
export function whatsappProductLink(lang: Lang, title: string, absoluteUrl: string): string {
  return whatsappLink(getDict(lang).common.msgProduct(title, absoluteUrl));
}

export function whatsappGeneralLink(lang: Lang): string {
  return whatsappLink(getDict(lang).common.msgGeneral);
}

export function telegramLink(): string {
  return contacts.telegramUrl;
}

export function callLink(): string {
  return `tel:${contacts.phone}`;
}
