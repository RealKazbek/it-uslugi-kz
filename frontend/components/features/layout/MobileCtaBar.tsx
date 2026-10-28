import { ButtonLink } from '@/components/ui/Button';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';

/** Sticky contact bar for phones: WhatsApp first, Telegram second. Hidden from md up. */
export function MobileCtaBar({ lang }: { lang: Lang }) {
  const d = getDict(lang).common;
  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper p-3 md:hidden">
      <div className="mx-auto flex max-w-5xl gap-2">
        <ButtonLink href={whatsappGeneralLink(lang)} className="flex-1">
          {d.mobileBar.whatsapp}
        </ButtonLink>
        <ButtonLink href={telegramLink()} variant="outline" className="flex-1">
          {d.mobileBar.telegram}
        </ButtonLink>
      </div>
    </aside>
  );
}
