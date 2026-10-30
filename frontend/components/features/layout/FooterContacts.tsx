import type { ReactNode } from 'react';
import { Mail, Phone } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { CONTACTS, contacts } from '@/lib/site/contacts';
import type { Lang } from '@/lib/i18n/locales';

function ContactItem({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex min-h-11 items-center gap-3 rounded-sm text-sm text-foreground no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-9"
      >
        <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-100 text-primary">
          {icon}
        </span>
        {children}
      </a>
    </li>
  );
}

/** Phone, WhatsApp, Telegram and email. Items whose CONTACTS value is empty are hidden. */
export function FooterContacts({ lang, label }: { lang: Lang; label: string }) {
  const phone = lang === 'en' ? contacts.phoneDisplayIntl : contacts.phoneDisplay;
  return (
    <ul aria-label={label}>
      {CONTACTS.phone && <ContactItem href={CONTACTS.phone} icon={<Phone className="size-4" />}>{phone}</ContactItem>}
      {CONTACTS.whatsapp && <ContactItem href={CONTACTS.whatsapp} icon={<SiWhatsapp size={14} />}>WhatsApp</ContactItem>}
      {CONTACTS.telegram && <ContactItem href={CONTACTS.telegram} icon={<SiTelegram size={14} />}>Telegram</ContactItem>}
      {CONTACTS.email && <ContactItem href={CONTACTS.email} icon={<Mail className="size-4" />}>{contacts.email}</ContactItem>}
    </ul>
  );
}
