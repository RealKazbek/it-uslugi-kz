import { NextResponse, type NextRequest } from 'next/server';
import { loadSearchDocs } from '@/lib/search/buildDocs';
import { parseSearchLang } from '@/lib/search/lang';
import type { SearchIndexPayload } from '@/lib/search/types';

/** Search docs change with the catalog; ISR window matches the read pages. */
export const revalidate = 3600;

/** Public, cacheable JSON: GET /api/search-index?lang=ru|kk|en. */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const lang = parseSearchLang(request.nextUrl.searchParams.get('lang'));
  if (lang === null) {
    return NextResponse.json({ ok: false, error: 'invalid_lang' }, { status: 400 });
  }
  try {
    const payload: SearchIndexPayload = { lang, docs: await loadSearchDocs(lang) };
    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (cause) {
    console.error('[search-index] load failed', {
      lang,
      error: cause instanceof Error ? cause.message : 'unknown',
    });
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 });
  }
}
