import { Wordmark } from '@/components/ui/Wordmark';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { FooterContacts } from './FooterContacts';
import { FooterSocials } from './FooterSocials';

/** Brand column: wordmark, description, team line, contacts and socials. */
export function FooterBrand({ lang }: { lang: Lang }) {
  const d = getDict(lang).footer;
  return (
    <div className="space-y-4 md:col-span-2 lg:col-span-1">
      <p>
        <Wordmark />
      </p>
      <p className="max-w-xs text-sm text-muted-foreground">{d.description}</p>
      <p className="max-w-xs text-sm text-muted-foreground">{d.team}</p>
      <FooterContacts lang={lang} label={d.contactsHeading} />
      <FooterSocials />
    </div>
  );
}
