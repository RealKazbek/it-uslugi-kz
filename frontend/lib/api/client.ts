import { config } from '@/lib/config';
import { ApiError } from './errors';

export interface GetOptions {
  /** Next.js cache tags, revalidated on demand by POST /api/revalidate. */
  tags: string[];
}

/** Incremental revalidation window for all read pages (seconds). */
export const REVALIDATE_SECONDS = 3600;

async function fetchJson(path: string, options: GetOptions): Promise<Response> {
  const url = `${config.apiInternalUrl}${path}`;
  try {
    return await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS, tags: options.tags },
    });
  } catch (cause) {
    throw new ApiError(0, path, `network error: ${cause instanceof Error ? cause.message : 'unknown'}`);
  }
}

/** GET a JSON resource. Throws ApiError on any non-2xx status, including 404. */
export async function apiGet<T>(path: string, options: GetOptions): Promise<T> {
  const response = await fetchJson(path, options);
  if (!response.ok) {
    throw new ApiError(response.status, path);
  }
  return (await response.json()) as T;
}

/** GET a JSON resource. Returns null on 404, throws ApiError on any other non-2xx status. */
export async function apiGetOrNull<T>(path: string, options: GetOptions): Promise<T | null> {
  const response = await fetchJson(path, options);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new ApiError(response.status, path);
  }
  return (await response.json()) as T;
}
