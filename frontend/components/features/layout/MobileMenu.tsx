'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Contact, LayoutGrid, Menu, MessageSquare, Tag, type LucideIcon } from 'lucide-react';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { RequestButton } from '@/components/features/lead/OpenLeadButton';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import type { Lang } from '@/lib/i18n/locales';
import { cn } from '@/lib/ui/cn';
import { LangSwitcher } from './LangSwitcher';
import { isNavActive } from './navActive';

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
  request: string;
}

export interface MobileMenuProps {
  lang: Lang;
  links: (NavLink & { icon: NavIcon })[];
  langNames: Record<Lang, string>;
  whatsappHref: string;
  telegramHref: string;
  labels: MobileMenuLabels;
}

/** Burger button and right-hand panel with navigation, language, request and messenger buttons. Shown below 900px only. */
export function MobileMenu({ lang, links, langNames, whatsappHref, telegramHref, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          {links.map((link) => (
            <MobileNavItem
              key={link.href}
              link={link}
              active={isNavActive(link.href, pathname)}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <div onClickCapture={() => setOpen(false)}>
            <RequestButton size="lg" className="w-full">
              {labels.request}
            </RequestButton>
          </div>
          <LangSwitcher lang={lang} names={langNames} switchLabel={labels.switchLabel} align="left" />
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

interface MobileNavItemProps {
  link: NavLink & { icon: NavIcon };
  active: boolean;
  onNavigate: () => void;
}

function MobileNavItem({ link, active, onNavigate }: MobileNavItemProps) {
  const Icon = NAV_ICONS[link.icon];
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex min-h-12 items-center gap-3 rounded-lg px-3 text-lg font-semibold no-underline hover:bg-muted',
        active ? 'bg-brand-soft text-brand' : 'text-foreground',
      )}
    >
      <Icon aria-hidden="true" className="size-5 text-primary" />
      {link.label}
    </Link>
  );
}
