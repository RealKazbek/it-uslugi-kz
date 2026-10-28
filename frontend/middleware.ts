import { NextResponse, type NextRequest } from 'next/server';
import { splitLocale } from '@/lib/i18n/paths';

/**
 * ru has no URL prefix: un-prefixed paths are rewritten to /ru/... internally, and /ru/... is
 * redirected (301) to the un-prefixed URL so each page has exactly one public address.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const { lang, rest } = splitLocale(pathname);

  if (lang === 'ru') {
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 301);
  }
  if (lang !== null) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? '/ru' : `/ru${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip /api, /_next and any path with a file extension (favicon.svg, robots.txt, portfolio images).
  matcher: ['/((?!api/|_next/|.*\\..*).*)'],
};
