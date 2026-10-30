import { splitLocale } from '@/lib/i18n/paths';

/** True when the pathname is the nav target or lies under it. The catalog also covers /products pages. */
export function isNavActive(href: string, pathname: string): boolean {
  const current = splitLocale(pathname).rest;
  const target = splitLocale(href).rest;
  const sections = target === '/catalog' ? [target, '/products'] : [target];
  return sections.some((section) => current === section || current.startsWith(`${section}/`));
}
