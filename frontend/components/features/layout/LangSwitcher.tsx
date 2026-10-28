'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDict } from '@/lib/i18n/dict';
import { localePath, splitLocale } from '@/lib/i18n/paths';
import { HTML_LANG, LANGS, type Lang } from '@/lib/i18n/locales';

/** City pages exist in ru and kk only, so en is not offered there. */
function langsFor(rest: string): readonly Lang[] {
  return rest.startsWith('/city/') ? (['ru', 'kk'] as const) : LANGS;
}

/**
 * Links the current page to its other languages. Targets come from the URL, so the
 * layout needs no per-page props and pages stay static (ISR).
 */
export function LangSwitcher({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const { rest } = splitLocale(pathname);
  const label = getDict(lang).common.switchLabel;

  return (
    <nav aria-label={label} className="flex gap-3 text-sm">
      {langsFor(rest).map((target) => (
        <Link
          key={target}
          href={localePath(target, rest)}
          hrefLang={HTML_LANG[target]}
          lang={HTML_LANG[target]}
          aria-current={target === lang ? 'true' : undefined}
          className={target === lang ? 'font-bold text-ink no-underline' : 'text-muted'}
        >
          {getDict(target).common.langName}
        </Link>
      ))}
    </nav>
  );
}
