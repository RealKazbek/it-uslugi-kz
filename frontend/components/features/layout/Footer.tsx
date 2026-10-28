import { Container } from '@/components/ui/Container';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { legal } from '@/lib/site/legal';
import { contacts } from '@/lib/site/contacts';
import { whatsappGeneralLink } from '@/lib/format/links';

export function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang).common;
  const phone = lang === 'en' ? contacts.phoneDisplayIntl : contacts.phoneDisplay;

  return (
    <footer className="mt-16 border-t border-line pb-24 md:pb-10">
      <Container className="grid gap-8 py-10 md:grid-cols-2">
        <div>
          <p className="font-bold">{contacts.brand}</p>
          <p className="text-muted">{d.footerTagline}</p>
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
        <div className="space-y-2 text-sm text-muted md:col-span-2">
          <p>{legal[lang]}</p>
          <p>{d.footerNote}</p>
        </div>
      </Container>
    </footer>
  );
}
