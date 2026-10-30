'use client';

import { Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { ButtonLink } from '@/components/ui/Button';

export interface MobileCtaBarProps {
  whatsappHref: string;
  telegramHref: string;
  callHref: string;
  labels: { whatsapp: string; telegram: string; call: string };
}

/** Phone contact bar, hidden from md up. Product pages render their own bar, so it is off there. */
export function MobileCtaBar({ whatsappHref, telegramHref, callHref, labels }: MobileCtaBarProps) {
  const pathname = usePathname();
  if (pathname.includes('/products/')) return null;

  const itemClass = 'flex-1 flex-col gap-1 px-2 text-sm';
  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <ButtonLink href={whatsappHref} variant="whatsapp" className={itemClass}>
          <SiWhatsapp aria-hidden="true" />
          {labels.whatsapp}
        </ButtonLink>
        <ButtonLink href={telegramHref} variant="telegram" className={itemClass}>
          <SiTelegram aria-hidden="true" />
          {labels.telegram}
        </ButtonLink>
        <ButtonLink href={callHref} variant="outline" className={itemClass}>
          <Phone aria-hidden="true" />
          {labels.call}
        </ButtonLink>
      </div>
    </aside>
  );
}
