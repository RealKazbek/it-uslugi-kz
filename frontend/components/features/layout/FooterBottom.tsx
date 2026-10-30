import { getDict } from '@/lib/i18n/dict';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { config } from '@/lib/config';
import { SITE_NAME } from '@/lib/site/brand';
import { LangSwitcher } from './LangSwitcher';

const LANG_NAMES = Object.fromEntries(LANGS.map((code) => [code, getDict(code).common.langName])) as Record<Lang, string>;

/** Bottom bar: copyright, agreement line, working hours and the language switcher (opens upward). */
export function FooterBottom({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-3 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
        <p>© {year} {SITE_NAME}</p>
        <p>{d.footer.agreement}</p>
        {config.workingHours && <p>{d.footer.hours(config.workingHours)}</p>}
      </div>
      <div className="-ml-3 md:ml-0">
        <LangSwitcher lang={lang} names={LANG_NAMES} switchLabel={d.common.switchLabel} placement="up" align="left" />
      </div>
    </div>
  );
}
