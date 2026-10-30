import type { ReactNode } from 'react';
import { OpenLeadButton } from '@/components/features/lead/OpenLeadButton';
import { Container } from '@/components/ui/Container';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { FooterBottom } from './FooterBottom';
import { FooterBrand } from './FooterBrand';
import { FooterColumn } from './FooterColumn';
import { loadFooterLinks } from './footerData';
import { FooterNav, type FooterLink } from './FooterNav';

function Column({ title, links, extra, label, twoColumns }: { title: string; links: FooterLink[]; extra?: ReactNode; label: string; twoColumns?: boolean }) {
  if (links.length === 0 && !extra) return null;
  return (
    <FooterColumn title={title}>
      <FooterNav label={label} links={links} extra={extra} twoColumns={twoColumns} />
    </FooterColumn>
  );
}

/** Site footer: brand, four link columns (accordion on mobile) and a bottom bar. Bottom padding clears the mobile CTA bar. */
export async function Footer({ lang, hasReviews }: { lang: Lang; hasReviews: boolean }) {
  const d = getDict(lang);
  const sets = await loadFooterLinks(lang);
  const info: FooterLink[] = [
    { href: localePath(lang, '/prices'), label: d.common.nav.prices },
    { href: localePath(lang, '/faq'), label: d.common.faq },
    ...(hasReviews ? [{ href: localePath(lang, '/reviews'), label: d.common.nav.reviews }] : []),
    { href: localePath(lang, '/contacts'), label: d.common.nav.contacts },
  ];
  const lbl = d.footer.navLabel;

  return (
    <footer className="mt-16 border-t border-line bg-surface-200 pb-24 pt-12 md:pb-12 lg:py-20">
      <Container>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr_1fr]">
          <FooterBrand lang={lang} />
          <Column title={d.footer.services} links={sets.services} label={lbl(d.footer.services)} />
          <Column title={d.footer.popular} links={sets.popular} label={lbl(d.footer.popular)} />
          <Column title={d.footer.cities} links={sets.cities} label={lbl(d.footer.cities)} twoColumns />
          <Column
            title={d.footer.info}
            links={info}
            label={lbl(d.footer.info)}
            extra={
              <OpenLeadButton size="sm" variant="outline">
                {d.footer.request}
              </OpenLeadButton>
            }
          />
        </div>
        <div className="mt-10 border-t border-line">
          <FooterBottom lang={lang} />
        </div>
      </Container>
    </footer>
  );
}
