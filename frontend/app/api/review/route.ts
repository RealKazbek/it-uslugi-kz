import { NextResponse, type NextRequest } from 'next/server';
import { config } from '@/lib/config';
import { submitReviewToBackend } from '@/lib/reviews/submit';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const raw: unknown = await request.json().catch(() => undefined);
  if (raw === undefined) {
    return NextResponse.json({ ok: false, reason: 'invalid', fields: ['body'] }, { status: 400 });
  }
  const result = await submitReviewToBackend(
    raw,
    {
      forwardedFor: request.headers.get('x-forwarded-for'),
      realIp: request.headers.get('x-real-ip'),
    },
    { apiBaseUrl: config.apiInternalUrl, fetchImpl: fetch },
  );
  return NextResponse.json(result.body, { status: result.status });
}
