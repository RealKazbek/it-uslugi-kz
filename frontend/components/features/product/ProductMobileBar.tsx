import { Phone } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { ButtonLink } from '@/components/ui/Button';
import { callLink, telegramLink, whatsappProductLink } from '@/lib/format/links';
import type { Lang } from '@/lib/i18n/locales';

export interface ProductMobileBarProps {
  lang: Lang;
  title: string;
  absoluteUrl: string;
  totalText: string;
  labels: { whatsapp: string; telegram: string; call: string };
}

/** Fixed order bar on phones: price on the left, three channel buttons on the right. */
export function ProductMobileBar({ lang, title, absoluteUrl, totalText, labels }: ProductMobileBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <p className="min-w-0 text-sm font-bold leading-tight tabular-nums">{totalText}</p>
        <div className="flex shrink-0 items-center gap-2">
          <ButtonLink href={whatsappProductLink(lang, title, absoluteUrl)} variant="whatsapp" size="icon" className="min-[480px]:w-auto min-[480px]:px-4">
            <SiWhatsapp aria-hidden="true" className="size-4" />
            <span className="sr-only min-[480px]:not-sr-only">{labels.whatsapp}</span>
          </ButtonLink>
          <ButtonLink href={telegramLink()} variant="telegram" size="icon">
            <SiTelegram aria-hidden="true" className="size-5" />
            <span className="sr-only">{labels.telegram}</span>
          </ButtonLink>
          <ButtonLink href={callLink()} variant="outline" size="icon">
            <Phone aria-hidden="true" className="size-5" />
            <span className="sr-only">{labels.call}</span>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
