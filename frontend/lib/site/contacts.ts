// Source: docs/content-config.json. Keep in sync with that file.
import { SITE_NAME } from './brand';
export const contacts = {
  brand: SITE_NAME,
  telegram: 'RealKazbek',
  telegramUrl: 'https://t.me/RealKazbek',
  whatsapp: '77066620060',
  phone: '+77066620060',
  phoneDisplay: '8 706 662 00 60',
  phoneDisplayIntl: '+7 706 662 00 60',
  email: '37765@iitu.edu.kz',
  portfolioUrl: 'https://realkazbek.site',
  github: 'https://github.com/RealKazbek',
} as const;

/** Social profiles shown with brand icons. null = no account yet; the link is not rendered. */
export const socials: { instagram: string | null; tiktok: string | null } = {
  instagram: null,
  tiktok: null,
};

/** Ready-to-use contact hrefs for the speed dial. Empty string = not configured; such items are not shown. */
export const CONTACTS = {
  whatsapp: 'https://wa.me/77066620060',
  telegram: contacts.telegramUrl,
  // TODO owner: add profile URL
  instagram: '',
  // TODO owner: add profile URL
  tiktok: '',
  phone: `tel:${contacts.phone}`,
  email: `mailto:${contacts.email}`,
} as const satisfies Record<string, string>;

export type ContactKey = keyof typeof CONTACTS;
