import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getDict } from '@/lib/i18n/dict';
import { LANGS } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Shown when a page inside a language segment calls notFound(). Inherits <html lang> from the layout.
 * Each block carries its own lang, so the text is given in ru, kk and en with links to the home page and the catalog.
 */
export default function LangNotFound() {
  return (
    <Section>
      <Container className="space-y-10">
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
      </Container>
    </Section>
  );
}
