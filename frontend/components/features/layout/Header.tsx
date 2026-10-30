import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';
import { whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import type { CommonDict } from '@/lib/i18n/dict/types';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { contacts } from '@/lib/site/contacts';
import { SiWhatsapp } from 'react-icons/si';
import { LangSwitcher } from './LangSwitcher';
import { MobileMenu, type NavIcon, type NavLink } from './MobileMenu';

const LANG_NAMES = Object.fromEntries(LANGS.map((code) => [code, getDict(code).common.langName])) as Record<Lang, string>;

function navLinks(lang: Lang, nav: CommonDict['nav'], hasReviews: boolean): (NavLink & { icon: NavIcon })[] {
  const links: (NavLink & { icon: NavIcon })[] = [
    { href: localePath(lang, '/catalog'), label: nav.catalog, icon: 'catalog' },
    { href: localePath(lang, '/prices'), label: nav.prices, icon: 'prices' },
  ];
  if (hasReviews) links.push({ href: localePath(lang, '/reviews'), label: nav.reviews, icon: 'reviews' });
  links.push({ href: localePath(lang, '/contacts'), label: nav.contacts, icon: 'contacts' });
  return links;
}

/** Sticky top bar: logo, desktop nav and WhatsApp from md, a sheet menu below md. */
export function Header({ lang, hasReviews }: { lang: Lang; hasReviews: boolean }) {
  const d = getDict(lang).common;
  const links = navLinks(lang, d.nav, hasReviews);
  const whatsappHref = whatsappGeneralLink(lang);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={localePath(lang, '/')} className="flex items-center gap-2 text-foreground no-underline">
          <Wordmark />
        </Link>
        <nav aria-label={d.menu} className="hidden md:flex md:items-center md:gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium text-foreground no-underline hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangSwitcher lang={lang} names={LANG_NAMES} switchLabel={d.switchLabel} />
          </div>
          <ButtonLink href={whatsappHref} variant="whatsapp" size="sm" className="hidden md:inline-flex">
            <SiWhatsapp aria-hidden="true" />
            <span className="sr-only lg:not-sr-only">{d.cta.whatsapp}</span>
          </ButtonLink>
          <div className="md:hidden">
            <MobileMenu
              lang={lang}
              links={links}
              langNames={LANG_NAMES}
              whatsappHref={whatsappHref}
              telegramHref={contacts.telegramUrl}
              labels={{
                open: d.menuOpen,
                close: d.menuClose,
                title: d.menu,
                switchLabel: d.switchLabel,
                whatsapp: d.cta.whatsapp,
                telegram: d.cta.telegram,
              }}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
