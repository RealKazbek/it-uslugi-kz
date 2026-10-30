import { Container } from '@/components/ui/Container';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { contacts } from '@/lib/site/contacts';
import { whatsappGeneralLink } from '@/lib/format/links';
import { localePath } from '@/lib/i18n/paths';
import Link from 'next/link';

export function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang).common;
  const phone = lang === 'en' ? contacts.phoneDisplayIntl : contacts.phoneDisplay;

  return (
    <footer className="mt-16 border-t border-border pb-24 md:pb-10">
      <Container className="grid gap-8 py-10 md:grid-cols-2">
        <div>
          <p className="font-bold">{contacts.brand}</p>
          <p className="text-muted-foreground">{d.footerTagline}</p>
        </div>
        <ul className="space-y-1">
          <li>
            <a href={whatsappGeneralLink(lang)} rel="noopener noreferrer" target="_blank">{d.wa}</a>
          </li>
          <li>
            <a href={contacts.telegramUrl} rel="noopener noreferrer" target="_blank">{d.tg}</a>
          </li>
          <li>
            <a href={`tel:${contacts.phone}`}>{phone}</a>
          </li>
          <li>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </li>
        </ul>
        <div className="space-y-2 text-sm text-muted-foreground md:col-span-2">
          <Link href={localePath(lang, '/contacts')} className="font-semibold text-foreground">
            {d.footerContacts}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
