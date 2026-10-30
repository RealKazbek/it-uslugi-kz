import { config } from '@/lib/config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Onest } from 'next/font/google';
import type { ReactNode } from 'react';
import '../globals.css';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { ContactSpeedDial } from '@/components/features/layout/ContactSpeedDial';
import { LeadModalProvider } from '@/components/features/lead/LeadModalProvider';
import { SearchPalette } from '@/components/features/search/SearchPalette';
import { SearchProvider } from '@/components/features/search/SearchProvider';
import { MobileCtaBar } from '@/components/features/layout/MobileCtaBar';
import { callLink, telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getCategories } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import { categoryView } from '@/lib/catalog/localize';
import { getReviewsSafe } from '@/lib/api/reviews';
import { getDict } from '@/lib/i18n/dict';
import { toProductOptions } from '@/lib/leads/serviceOptions';
import { HTML_LANG, LANGS, isLang } from '@/lib/i18n/locales';

/** Onest: Latin + Cyrillic + cyrillic-ext (Kazakh ә ғ қ ң ө ұ ү һ і). */
const fontSans = Onest({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  // optional: no late swap repaint of the hero text (mobile LCP); fallback metrics are adjusted by next/font.
  display: 'optional',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
};

export function generateStaticParams(): { lang: string }[] {
  return LANGS.map((lang) => ({ lang }));
}

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

/** The single root layout: sets <html lang> from the URL segment and rejects unknown languages. */
export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDict(lang).common;
  const lead = getDict(lang).lead;
  const [productDtos, categoryDtos] = await Promise.all([getProducts(lang).catch(() => []), getCategories().catch(() => [])]);
  const products = toProductOptions(
    productDtos,
    categoryDtos.map((dto) => categoryView(dto, lang)),
  );
  const hasReviews = (await getReviewsSafe()).results.length > 0;

  return (
    <html lang={HTML_LANG[lang]} className={fontSans.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <a href="#main" className="skip-link">
          {d.skip}
        </a>
        <MotionProvider>
          <LeadModalProvider
            lang={lang}
            products={products}
            labels={lead}
            titles={{ title: lead.modalTitle, subtitle: lead.modalSubtitle, close: lead.close }}
          >
          <SearchProvider>
          <Header lang={lang} hasReviews={hasReviews} />
          <main id="main" className="pt-16 min-[900px]:pt-20">{children}</main>
          <Footer lang={lang} hasReviews={hasReviews} />
          <MobileCtaBar
            whatsappHref={whatsappGeneralLink(lang)}
            telegramHref={telegramLink()}
            callHref={callLink()}
            labels={{ whatsapp: d.wa, telegram: d.tg, call: d.cta.call }}
          />
          <ContactSpeedDial lang={lang} labels={d.speedDial} socials={{ instagram: config.instagramUrl, tiktok: config.tiktokUrl }} />
          <SearchPalette lang={lang} labels={getDict(lang).search} />
          </SearchProvider>
          </LeadModalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
