// Source: docs/content-config.json. Keep in sync with that file.
export const contacts = {
  brand: 'RK Dev',
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
