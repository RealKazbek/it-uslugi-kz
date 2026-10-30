import { ButtonLink } from '@/components/ui/Button';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';

export function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div className="max-w-prose space-y-6 pb-4 pt-10 md:pt-16">
      <h1 className="text-[1.9rem] leading-tight md:text-[2.6rem]">{d.home.h1}</h1>
      <p className="text-lg text-muted-foreground">{d.home.lead}</p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={whatsappGeneralLink(lang)} variant="whatsapp">{d.home.ctaWhatsapp}</ButtonLink>
        <ButtonLink href={telegramLink()} variant="outline">
          {d.common.tg}
        </ButtonLink>
      </div>
    </div>
  );
}
