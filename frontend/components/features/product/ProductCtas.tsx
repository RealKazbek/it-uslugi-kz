import { ButtonLink } from '@/components/ui/Button';
import { telegramLink, whatsappProductLink } from '@/lib/format/links';
import type { Lang } from '@/lib/i18n/locales';
import { getDict } from '@/lib/i18n/dict';

interface ProductCtasProps {
  lang: Lang;
  title: string;
  absoluteUrl: string;
}

/** WhatsApp is the primary CTA; the message carries the product name and the absolute page URL. */
export function ProductCtas({ lang, title, absoluteUrl }: ProductCtasProps) {
  const d = getDict(lang).common;
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href={whatsappProductLink(lang, title, absoluteUrl)} variant="whatsapp">{d.wa}</ButtonLink>
      <ButtonLink href={telegramLink()} variant="outline">
        {d.tg}
      </ButtonLink>
    </div>
  );
}
