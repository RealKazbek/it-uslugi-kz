'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Contact, LayoutGrid, Menu, MessageSquare, Tag, type LucideIcon } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import type { Lang } from '@/lib/i18n/locales';
import { LangSwitcher } from './LangSwitcher';

export type NavIcon = 'catalog' | 'prices' | 'reviews' | 'contacts';
export interface NavLink {
  href: string;
  label: string;
}

const NAV_ICONS: Record<NavIcon, LucideIcon> = {
  catalog: LayoutGrid,
  prices: Tag,
  reviews: MessageSquare,
  contacts: Contact,
};

export interface MobileMenuLabels {
  open: string;
  close: string;
  title: string;
  switchLabel: string;
  whatsapp: string;
  telegram: string;
}

export interface MobileMenuProps {
  lang: Lang;
  links: (NavLink & { icon: NavIcon })[];
  langNames: Record<Lang, string>;
  whatsappHref: string;
  telegramHref: string;
  labels: MobileMenuLabels;
}

/** Sheet with the main navigation, language switch and messenger buttons. Shown below md only. */
export function MobileMenu({ lang, links, langNames, whatsappHref, telegramHref, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.open}>
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" closeLabel={labels.close}>
        <SheetTitle className="sr-only">{labels.title}</SheetTitle>
        <nav aria-label={labels.title} className="mt-12 flex flex-col gap-1">
          {links.map((link) => {
            const Icon = NAV_ICONS[link.icon];
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-lg font-semibold text-foreground no-underline hover:bg-muted"
              >
                <Icon aria-hidden="true" className="size-5 text-primary" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <LangSwitcher lang={lang} names={langNames} switchLabel={labels.switchLabel} />
          <ButtonLink href={whatsappHref} variant="whatsapp" className="w-full">
            <SiWhatsapp aria-hidden="true" />
            {labels.whatsapp}
          </ButtonLink>
          <ButtonLink href={telegramHref} variant="telegram" className="w-full">
            <SiTelegram aria-hidden="true" />
            {labels.telegram}
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
