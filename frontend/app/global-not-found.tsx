import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import './globals.css';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';

export const metadata: Metadata = {
  title: '404: Страница не найдена | Бет табылмады | Page not found',
  description: 'Страница не найдена. Бет табылмады. Page not found. RK Dev.',
  robots: { index: false, follow: false },
};

/** Rendered with status 404 for unknown URLs. The text is given in ru, kk and en, each with its own links. */
export default function GlobalNotFound(): ReactNode {
  return (
    <html lang="ru">
      <body>
        <main className="mx-auto max-w-5xl space-y-10 px-4 py-16">
          <h1 className="text-[1.9rem] md:text-[2.4rem]">404</h1>
          {LANGS.map((lang) => {
            const d = getDict(lang).common.notFound;
            return (
              <section key={lang} lang={lang} className="space-y-2 border-t border-line pt-6">
                <h2 className="text-xl">{d.title}</h2>
                <p className="text-muted">{d.text}</p>
                <p className="flex gap-4 font-semibold">
                  <Link href={localePath(lang, '/')}>{d.home}</Link>
                  <Link href={localePath(lang, '/catalog')}>{d.catalog}</Link>
                </p>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
