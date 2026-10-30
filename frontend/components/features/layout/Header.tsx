import Link from 'next/link';
import { RequestButton } from '@/components/features/lead/OpenLeadButton';
import { SearchButton } from '@/components/features/search/SearchButton';
import { Wordmark } from '@/components/ui/Wordmark';
import { getDict } from '@/lib/i18n/dict';
import type { CommonDict } from '@/lib/i18n/dict/types';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { whatsappGeneralLink } from '@/lib/format/links';
import { contacts } from '@/lib/site/contacts';
import { HeaderShell } from './HeaderShell';
import { LangSwitcher } from './LangSwitcher';
import { MobileMenu, type NavIcon, type NavLink } from './MobileMenu';
import { NavLinks } from './NavLinks';

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

/** Fixed top bar: logo, desktop nav and actions from 900px, a side panel below 900px. */
export function Header({ lang, hasReviews }: { lang: Lang; hasReviews: boolean }) {
  const d = getDict(lang).common;
  const links = navLinks(lang, d.nav, hasReviews);
  const whatsappHref = whatsappGeneralLink(lang);

  return (
    <HeaderShell>
      <Link href={localePath(lang, '/')} className="flex items-center justify-self-start gap-2 text-foreground no-underline">
        <Wordmark />
      </Link>
      <NavLinks label={d.menu} items={links} />
      <div className="col-start-3 flex items-center gap-3 justify-self-end">
        <SearchButton lang={lang} labels={{ label: getDict(lang).search.label, hint: getDict(lang).search.hint }} />
        <div className="hidden items-center gap-3 min-[900px]:flex">
          <LangSwitcher lang={lang} names={LANG_NAMES} switchLabel={d.switchLabel} />
          <RequestButton size="sm">{d.cta.request}</RequestButton>
        </div>
        <div className="min-[900px]:hidden">
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
              request: d.cta.request,
            }}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
