import type { ContactKey } from './contacts';

/** Display order of the speed dial list. */
export const SPEED_DIAL_ORDER: readonly ContactKey[] = ['whatsapp', 'telegram', 'instagram', 'tiktok', 'phone', 'email'];

export interface SpeedDialItem {
  key: ContactKey;
  href: string;
}

/** Returns the speed dial items in display order, skipping entries with an empty href. */
export function activeContacts(config: Readonly<Record<ContactKey, string>>): SpeedDialItem[] {
  return SPEED_DIAL_ORDER.flatMap((key) => {
    const href = config[key].trim();
    return href === '' ? [] : [{ key, href }];
  });
}
