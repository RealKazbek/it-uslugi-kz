import type { ReactNode } from 'react';
import { Globe, Mail, Phone } from 'lucide-react';
import { SiGithub, SiTelegram, SiWhatsapp } from 'react-icons/si';

export type ContactIcon = 'whatsapp' | 'telegram' | 'phone' | 'mail' | 'site' | 'github';

export interface ContactItem {
  label: string;
  href: string;
  text: string;
  external: boolean;
  icon: ContactIcon;
}

const ICONS: Record<ContactIcon, ReactNode> = {
  whatsapp: <SiWhatsapp aria-hidden="true" className="size-5" />,
  telegram: <SiTelegram aria-hidden="true" className="size-5" />,
  phone: <Phone aria-hidden="true" className="size-5" />,
  mail: <Mail aria-hidden="true" className="size-5" />,
  site: <Globe aria-hidden="true" className="size-5" />,
  github: <SiGithub aria-hidden="true" className="size-5" />,
};

/** Contact channels as cards with icons. External links open in a new tab. */
export function ContactList({ items }: { items: ContactItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex h-full min-h-16 items-center gap-4 rounded-xl border border-border bg-card p-5 text-foreground no-underline shadow-card transition-shadow duration-base ease-out hover:shadow-card-hover"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary-hover">
              {ICONS[item.icon]}
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-muted-foreground">{item.label}</span>
              <span className="block break-all font-semibold group-hover:underline">{item.text}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
