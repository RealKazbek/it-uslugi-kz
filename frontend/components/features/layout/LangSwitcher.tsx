'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localePath, splitLocale } from '@/lib/i18n/paths';
import { HTML_LANG, LANGS, type Lang } from '@/lib/i18n/locales';

export interface LangSwitcherProps {
  lang: Lang;
  /** Language names in their own language, passed from the server (no dictionary functions on the client). */
  names: Record<Lang, string>;
  switchLabel: string;
}

/** City pages exist in ru and kk only, so en is not offered there. */
function langsFor(rest: string): readonly Lang[] {
  return rest.startsWith('/city/') ? (['ru', 'kk'] as const) : LANGS;
}

/**
 * Links the current page to its other languages. Targets come from the URL, so the
 * layout needs no per-page props and pages stay static (ISR).
 */
export function LangSwitcher({ lang, names, switchLabel }: LangSwitcherProps) {
  const pathname = usePathname();
  const { rest } = splitLocale(pathname);

  return (
    <nav aria-label={switchLabel} className="flex gap-3 text-sm">
      {langsFor(rest).map((target) => (
        <Link
          key={target}
          href={localePath(target, rest)}
          hrefLang={HTML_LANG[target]}
          lang={HTML_LANG[target]}
          aria-current={target === lang ? 'true' : undefined}
          className={target === lang ? 'font-bold text-foreground no-underline' : 'text-muted-foreground'}
        >
          {names[target]}
        </Link>
      ))}
    </nav>
  );
}
