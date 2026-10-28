import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { MobileCtaBar } from '@/components/features/layout/MobileCtaBar';
import { getDict } from '@/lib/i18n/dict';
import { HTML_LANG, LANGS, isLang } from '@/lib/i18n/locales';

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
  const skip = getDict(lang).common.skip;

  return (
    <html lang={HTML_LANG[lang]}>
      <body>
        <a href="#main" className="skip-link">
          {skip}
        </a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <MobileCtaBar lang={lang} />
      </body>
    </html>
  );
}
