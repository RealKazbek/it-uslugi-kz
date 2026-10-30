import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { contacts } from '@/lib/site/contacts';
import { FooterContacts } from './FooterContacts';
import { FooterSocials } from './FooterSocials';

/** Light footer: brand, site map, contacts and socials. Bottom padding clears the mobile CTA bar. */
export function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang).common;
  const year = new Date().getFullYear();
  const links = [
    { href: localePath(lang, '/catalog'), label: d.nav.catalog },
    { href: localePath(lang, '/prices'), label: d.nav.prices },
    { href: localePath(lang, '/contacts'), label: d.nav.contacts },
  ];

  return (
    <footer className="mt-16 border-t border-border bg-muted pb-24 md:pb-10">
      <Container className="grid gap-10 py-12 lg:grid-cols-4">
        <div className="space-y-3">
          <p>
            <Wordmark />
          </p>
          <p className="max-w-prose text-muted-foreground">{d.footerTagline}</p>
          <p className="max-w-prose text-sm text-muted-foreground">{d.footerNote}</p>
          <FooterSocials />
        </div>
        <nav aria-label={d.menu} className="space-y-2">
          {links.map((link) => (
            <p key={link.href}>
              <Link href={link.href} className="text-foreground no-underline hover:underline">
                {link.label}
              </Link>
            </p>
          ))}
          <p>
            <Link href={localePath(lang, '/contacts')} className="font-semibold text-foreground">
              {d.footerContacts}
            </Link>
          </p>
        </nav>
        <FooterContacts lang={lang} />
      </Container>
      <div className="border-t border-border">
        <Container className="py-4 text-sm text-muted-foreground">
          © {year} {contacts.brand}
        </Container>
      </div>
    </footer>
  );
}
