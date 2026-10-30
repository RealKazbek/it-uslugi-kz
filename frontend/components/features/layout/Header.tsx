import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Monogram } from '@/components/ui/Monogram';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { contacts } from '@/lib/site/contacts';
import { LangSwitcher } from './LangSwitcher';

const LANG_NAMES: Record<Lang, string> = {
  ru: getDict('ru').common.langName,
  kk: getDict('kk').common.langName,
  en: getDict('en').common.langName,
};

export function Header({ lang }: { lang: Lang }) {
  const d = getDict(lang).common;
  const switchLabel = d.switchLabel;
  const links = [
    { href: '/catalog', label: d.nav.catalog },
    { href: '/prices', label: d.nav.prices },
    { href: '/portfolio', label: d.nav.portfolio },
    { href: '/contacts', label: d.nav.contacts },
  ];

  return (
    <header className="border-b border-border">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link href={localePath(lang, '/')} className="flex items-center gap-2 text-foreground no-underline">
          <Monogram size={32} />
          <span className="text-lg font-extrabold tracking-tight">{contacts.brand}</span>
        </Link>
        <nav aria-label={d.menu} className="flex flex-wrap gap-x-5 gap-y-1">
          {links.map((link) => (
            <Link key={link.href} href={localePath(lang, link.href)} className="text-foreground no-underline hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <LangSwitcher lang={lang} names={LANG_NAMES} switchLabel={switchLabel} />
      </Container>
    </header>
  );
}
