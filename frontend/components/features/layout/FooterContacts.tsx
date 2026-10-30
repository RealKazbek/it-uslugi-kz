import type { ReactNode } from 'react';
import { Mail, Phone } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { contacts } from '@/lib/site/contacts';

function ContactItem({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="inline-flex min-h-11 items-center gap-3 text-foreground no-underline hover:underline"
      >
        <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary">
          {icon}
        </span>
        {children}
      </a>
    </li>
  );
}

/** Messenger, phone and email links with icons. */
export function FooterContacts({ lang }: { lang: Lang }) {
  const d = getDict(lang).common;
  const phone = lang === 'en' ? contacts.phoneDisplayIntl : contacts.phoneDisplay;

  return (
    <div className="space-y-3">
      <p className="font-bold">{d.social}</p>
      <ul className="space-y-1">
        <ContactItem href={whatsappGeneralLink(lang)} icon={<SiWhatsapp size={16} />}>{d.wa}</ContactItem>
        <ContactItem href={telegramLink()} icon={<SiTelegram size={16} />}>{d.tg}</ContactItem>
        <ContactItem href={`tel:${contacts.phone}`} icon={<Phone className="size-4" />}>{phone}</ContactItem>
        <ContactItem href={`mailto:${contacts.email}`} icon={<Mail className="size-4" />}>{contacts.email}</ContactItem>
      </ul>
    </div>
  );
}
