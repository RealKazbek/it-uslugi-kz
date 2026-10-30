'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MutableRefObject,
  type RefObject,
} from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/ui/cn';
import { HTML_LANG, LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath, splitLocale } from '@/lib/i18n/paths';
import { nextMenuIndex } from './langMenuKeys';

export interface LangSwitcherProps {
  lang: Lang;
  /** Language names in their own language, passed from the server (no dictionary functions on the client). */
  names: Record<Lang, string>;
  switchLabel: string;
  /** Edge the dropdown opens from: right in the header, left inside the mobile panel. */
  align?: 'left' | 'right';
}

/** City pages exist in ru and kk only, so en is not offered there. */
function langsFor(rest: string): readonly Lang[] {
  return rest.startsWith('/city/') ? (['ru', 'kk'] as const) : LANGS;
}

function itemsOf(menu: HTMLElement | null): HTMLAnchorElement[] {
  return Array.from(menu?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []);
}

/**
 * Globe button that toggles a menu of language links. Targets come from the URL, so the
 * layout needs no per-page props and pages stay static (ISR).
 */
export function LangSwitcher({ lang, names, switchLabel, align = 'right' }: LangSwitcherProps) {
  const pathname = usePathname();
  const { rest } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<'first' | 'last' | null>(null);
  const menuId = useId();

  useMenuBehavior({ open, setOpen, rootRef, buttonRef, menuRef, pendingFocus });

  const onButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (open || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;
    event.preventDefault();
    pendingFocus.current = event.key === 'ArrowUp' ? 'last' : 'first';
    setOpen(true);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`${switchLabel}: ${names[lang]}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onButtonKeyDown}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-foreground transition-colors duration-fast hover:bg-surface-200"
      >
        <Globe aria-hidden="true" className="size-4" />
        <span aria-hidden="true">{lang.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" className={cn('size-4 transition-transform duration-fast', open && 'rotate-180')} />
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={switchLabel}
          className={cn(
            'absolute top-full z-50 mt-2 w-44 animate-in fade-in-0 zoom-in-95 duration-fast rounded-lg border border-line bg-surface-100 p-1 shadow-pop',
            align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right',
          )}
        >
          {langsFor(rest).map((target) => (
            <LangMenuItem key={target} target={target} current={lang} names={names} rest={rest} onSelect={() => setOpen(false)} />
          ))}
        </div>
      )}
    </div>
  );
}

interface LangMenuItemProps {
  target: Lang;
  current: Lang;
  names: Record<Lang, string>;
  rest: string;
  onSelect: () => void;
}

function LangMenuItem({ target, current, names, rest, onSelect }: LangMenuItemProps) {
  const isCurrent = target === current;
  return (
    <Link
      role="menuitem"
      href={localePath(target, rest)}
      hrefLang={HTML_LANG[target]}
      lang={HTML_LANG[target]}
      aria-current={isCurrent ? 'true' : undefined}
      onClick={onSelect}
      className={cn(
        'flex min-h-11 items-center justify-between gap-3 rounded-md px-3 text-sm no-underline hover:bg-surface-200 focus-visible:bg-surface-200 focus-visible:outline-none',
        isCurrent ? 'font-bold text-foreground' : 'text-muted-foreground',
      )}
    >
      {names[target]}
      {isCurrent && <Check aria-hidden="true" className="size-4 text-brand" />}
    </Link>
  );
}

interface MenuBehaviorArgs {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: RefObject<HTMLDivElement | null>;
  buttonRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  pendingFocus: MutableRefObject<'first' | 'last' | null>;
}

/** Outside-click close, Esc/Tab/arrow keys, and focus placement when opened from the keyboard. */
function useMenuBehavior({ open, setOpen, rootRef, buttonRef, menuRef, pendingFocus }: MenuBehaviorArgs): void {
  useEffect(() => {
    if (!open) return;
    const pending = pendingFocus.current;
    pendingFocus.current = null;
    const items = itemsOf(menuRef.current);
    if (pending !== null) items[pending === 'first' ? 0 : items.length - 1]?.focus();
  }, [open, menuRef, pendingFocus]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && rootRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key === 'Tab') {
        setOpen(false);
        return;
      }
      const items = itemsOf(menuRef.current);
      const index = items.findIndex((item) => item === document.activeElement);
      const next = nextMenuIndex(event.key, index, items.length);
      if (next === null) return;
      event.preventDefault();
      items[next]?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen, rootRef, buttonRef, menuRef]);
}
