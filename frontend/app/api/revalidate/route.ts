import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { internalApiToken } from '@/lib/config';
import { parseRevalidateBody } from '@/lib/revalidate/parse';
import { isValidInternalToken } from '@/lib/security/token';

export const dynamic = 'force-dynamic';

const TOKEN_HEADER = 'x-internal-token';

/** Called by the backend after catalog changes. Requires X-Internal-Token == INTERNAL_API_TOKEN. */
export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!isValidInternalToken(request.headers.get(TOKEN_HEADER), internalApiToken())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const raw: unknown = await request.json().catch(() => undefined);
  const parsed = parseRevalidateBody(raw);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.reason }, { status: 400 });
  }
  for (const tag of parsed.tags) {
    revalidateTag(tag);
  }
  return NextResponse.json({ revalidated: parsed.tags.length });
}
