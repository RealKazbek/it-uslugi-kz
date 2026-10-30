import { Phone } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { ButtonLink } from '@/components/ui/Button';
import { callLink, telegramLink, whatsappProductLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';

interface ProductCtasProps {
  lang: Lang;
  title: string;
  absoluteUrl: string;
  /** Include the phone button (order card yes, bottom CTA block optional). */
  withCall?: boolean;
}

/** WhatsApp is the primary CTA; the message carries the product name and the absolute page URL. */
export function ProductCtas({ lang, title, absoluteUrl, withCall = true }: ProductCtasProps) {
  const cta = getDict(lang).common.cta;
  return (
    <div className="flex flex-col gap-2.5">
      <ButtonLink href={whatsappProductLink(lang, title, absoluteUrl)} variant="whatsapp" size="lg" className="w-full">
        <SiWhatsapp aria-hidden="true" className="size-5" />
        {cta.whatsapp}
      </ButtonLink>
      <div className={withCall ? 'grid grid-cols-2 gap-2.5' : ''}>
        <ButtonLink href={telegramLink()} variant="telegram" className="w-full">
          <SiTelegram aria-hidden="true" className="size-5" />
          {cta.telegram}
        </ButtonLink>
        {withCall && (
          <ButtonLink href={callLink()} variant="outline" className="w-full">
            <Phone aria-hidden="true" className="size-5" />
            {cta.call}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
