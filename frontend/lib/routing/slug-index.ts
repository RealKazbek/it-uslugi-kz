import { createSlugLoader, type SlugLoaderOptions } from './slug-loader';
import type { SlugKind } from './slug-types';

export type { SlugKind, SlugPayload } from './slug-types';

export const SLUG_TTL_MS = 60_000;
export const SLUG_BACKOFF_MS = 30_000;

export interface SlugIndexOptions extends Omit<SlugLoaderOptions, 'backoffMs'> {
  ttlMs?: number;
  backoffMs?: number;
}

export interface SlugIndex {
  /** true / false when decided from the index; null when unknown (fail open: Next serves the request). */
  isKnown: (kind: SlugKind, slug: string) => Promise<boolean | null>;
}

/**
 * Existence check for slugs. Known slugs are answered from memory and never wait for a load. A miss
 * waits for the shared load only when the backoff allows one; otherwise it is decided from the snapshot.
 */
export function createSlugIndex(options: SlugIndexOptions): SlugIndex {
  const ttl = options.ttlMs ?? SLUG_TTL_MS;
  const loader = createSlugLoader({ ...options, backoffMs: options.backoffMs ?? SLUG_BACKOFF_MS });

  async function afterLoad(kind: SlugKind, slug: string): Promise<boolean | null> {
    const ok = await loader.attempt();
    const snapshot = loader.snapshot();
    return ok && snapshot ? snapshot.sets[kind].has(slug) : null;
  }

  return {
    async isKnown(kind, slug) {
      const now = options.now();
      const snapshot = loader.snapshot();
      const fresh = snapshot !== null && now - snapshot.loadedAt < ttl;
      const hit = snapshot !== null && snapshot.sets[kind].has(slug);
      const canAttempt = loader.canAttempt(now);

      if (fresh && hit) return true;
      if (snapshot && hit) {
        if (canAttempt) void loader.attempt();
        return true;
      }
      if (loader.loading()) return afterLoad(kind, slug);
      if (fresh) return canAttempt ? afterLoad(kind, slug) : false;
      return canAttempt ? afterLoad(kind, slug) : null;
    },
  };
}
