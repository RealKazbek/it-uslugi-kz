import { NextResponse, type NextRequest } from 'next/server';
import { splitLocale } from '@/lib/i18n/paths';

/** Marks requests that this middleware rewrote, so the rewritten /ru/... path is not redirected again. */
const REWRITE_HEADER = 'x-rk-rewritten';

/**
 * ru has no URL prefix: un-prefixed paths are rewritten to /ru/... internally, and a direct /ru/... request
 * is redirected (301) to the un-prefixed URL so each page has exactly one public address.
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const { lang, rest } = splitLocale(pathname);
  const rewritten = request.headers.get(REWRITE_HEADER) !== null;

  if (lang === 'ru' && !rewritten) {
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 301);
  }
  if (lang !== null) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? '/ru' : `/ru${pathname}`;
  const headers = new Headers(request.headers);
  headers.set(REWRITE_HEADER, '1');
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip /api, /_next and any path with a file extension (favicon.svg, robots.txt, portfolio images).
  matcher: ['/((?!api/|_next/|.*\\..*).*)'],
};
