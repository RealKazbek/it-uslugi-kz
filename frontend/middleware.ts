import { NextResponse, type NextRequest } from 'next/server';
import { isMissingPage } from '@/lib/routing/missing';
import { notFoundHtml } from '@/lib/routing/not-found-html';
import { splitLocale } from '@/lib/i18n/paths';
import type { Lang } from '@/lib/i18n/locales';

/** Marks requests this middleware rewrote. Random per process; incoming copies are stripped. */
const REWRITE_HEADER = 'x-rk-rewritten';
const REWRITE_MARK = crypto.randomUUID();
function cleanHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers);
  headers.delete(REWRITE_HEADER);
  return headers;
}

function rewriteTo(request: NextRequest, path: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = path;
  const headers = cleanHeaders(request);
  headers.set(REWRITE_HEADER, REWRITE_MARK);
  return NextResponse.rewrite(url, { request: { headers } });
}

function notFoundResponse(lang: Lang): NextResponse {
  return new NextResponse(notFoundHtml(lang), {
    status: 404,
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
  });
}

/**
 * Language routing: ru has no prefix (un-prefixed paths are rewritten to /ru/...), and a direct /ru/...
 * request is redirected (301) to the un-prefixed URL. Paths without a page are rewritten to the 404 route.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const { lang, rest } = splitLocale(pathname);
  const rewritten = request.headers.get(REWRITE_HEADER) === REWRITE_MARK;

  if (lang === 'ru' && !rewritten) {
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 301);
  }
  if (lang === null) {
    // Decide here: Next does not run the middleware again for a rewritten path.
    if (await isMissingPage('ru', pathname)) return notFoundResponse('ru');
    return rewriteTo(request, pathname === '/' ? '/ru' : `/ru${pathname}`);
  }
  if (await isMissingPage(lang, rest)) {
    return notFoundResponse(lang);
  }
  return NextResponse.next({ request: { headers: cleanHeaders(request) } });
}

export const config = {
  // Skip /api, /_next and any path with a file extension (favicon.svg, robots.txt, sitemap.xml, portfolio images).
  matcher: ['/((?!api/|_next/|.*\\..*).*)'],
};
