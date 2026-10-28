import { NextResponse, type NextRequest } from 'next/server';
import { splitLocale } from '@/lib/i18n/paths';

/**
 * Marks requests this middleware rewrote. The value is random per process, so a client cannot forge it.
 * Incoming copies of the header are always removed before the request is handled.
 */
const REWRITE_HEADER = 'x-rk-rewritten';
const REWRITE_MARK = crypto.randomUUID();

function cleanHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers);
  headers.delete(REWRITE_HEADER);
  return headers;
}

/**
 * ru has no URL prefix: un-prefixed paths are rewritten to /ru/... internally. A direct /ru/... request
 * that reaches the middleware is redirected to the un-prefixed URL (next.config handles the common cases first).
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const { lang, rest } = splitLocale(pathname);
  const rewritten = request.headers.get(REWRITE_HEADER) === REWRITE_MARK;

  if (lang === 'ru' && !rewritten) {
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 301);
  }
  if (lang !== null) {
    return NextResponse.next({ request: { headers: cleanHeaders(request) } });
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? '/ru' : `/ru${pathname}`;
  const headers = cleanHeaders(request);
  headers.set(REWRITE_HEADER, REWRITE_MARK);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip /api, /_next and any path with a file extension (favicon.svg, robots.txt, sitemap.xml, portfolio images).
  matcher: ['/((?!api/|_next/|.*\\..*).*)'],
};
