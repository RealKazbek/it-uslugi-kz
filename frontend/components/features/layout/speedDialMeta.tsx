import type { ReactNode } from 'react';
import { Mail, Phone } from 'lucide-react';
import { SiInstagram, SiTelegram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import type { CommonDict } from '@/lib/i18n/dict/types';
import type { ContactKey } from '@/lib/site/contacts';

export type SpeedDialLabels = CommonDict['speedDial'];

export interface SpeedDialMeta {
  icon: ReactNode;
  /** Classes for the 32px circle behind the icon. Only existing tokens. */
  circleClass: string;
  label: (labels: SpeedDialLabels) => string;
}

const ICON_SIZE = 16;

export const SPEED_DIAL_META: Record<ContactKey, SpeedDialMeta> = {
  whatsapp: {
    icon: <SiWhatsapp size={ICON_SIZE} aria-hidden="true" />,
    circleClass: 'bg-whatsapp text-whatsapp-foreground',
    label: (l) => l.whatsapp,
  },
  telegram: {
    icon: <SiTelegram size={ICON_SIZE} aria-hidden="true" />,
    circleClass: 'bg-telegram text-surface-100',
    label: (l) => l.telegram,
  },
  instagram: {
    icon: <SiInstagram size={ICON_SIZE} aria-hidden="true" />,
    circleClass: 'border border-line bg-surface-100 text-brand',
    label: (l) => l.instagram,
  },
  // Instagram and TikTok both use existing Perne tokens (brand, foreground); no new colours.
  tiktok: {
    icon: <SiTiktok size={ICON_SIZE} aria-hidden="true" />,
    circleClass: 'border border-line bg-surface-100 text-foreground',
    label: (l) => l.tiktok,
  },
  phone: {
    icon: <Phone size={ICON_SIZE} aria-hidden="true" />,
    circleClass: 'bg-primary text-primary-foreground',
    label: (l) => l.call,
  },
  email: {
    icon: <Mail size={ICON_SIZE} aria-hidden="true" />,
    circleClass: 'bg-primary text-primary-foreground',
    label: (l) => l.email,
  },
};
