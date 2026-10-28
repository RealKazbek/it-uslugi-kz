export type SlugKind = 'products' | 'categories' | 'cities';

export const SLUG_TTL_MS = 300_000;
export const SLUG_MIN_REFRESH_MS = 30_000;

export interface SlugIndexOptions {
  /** Loads the current slugs of a kind. Returns null when the API cannot be reached. */
  load: (kind: SlugKind) => Promise<string[] | null>;
  now: () => number;
  ttlMs?: number;
  minRefreshMs?: number;
  onFailure?: (kind: SlugKind, message: string) => void;
}

interface Entry {
  slugs: Set<string>;
  loadedAt: number;
  refreshedAt: number;
}

export interface SlugIndex {
  /** true / false when decided from the index; null when unknown (fail open: let Next serve the page). */
  isKnown: (kind: SlugKind, slug: string) => Promise<boolean | null>;
}

/**
 * In-memory index of existing slugs. A known slug is a hit with no call. A miss refreshes the set at most
 * once per `minRefreshMs`, so a new product appears quickly without a call per request.
 */
export function createSlugIndex(options: SlugIndexOptions): SlugIndex {
  const ttl = options.ttlMs ?? SLUG_TTL_MS;
  const minRefresh = options.minRefreshMs ?? SLUG_MIN_REFRESH_MS;
  const entries = new Map<SlugKind, Entry>();

  async function refresh(kind: SlugKind): Promise<Entry | null> {
    const now = options.now();
    const loaded = await options.load(kind);
    if (loaded === null) {
      options.onFailure?.(kind, 'slug list unavailable');
      return null;
    }
    const entry: Entry = { slugs: new Set(loaded), loadedAt: now, refreshedAt: now };
    entries.set(kind, entry);
    return entry;
  }

  return {
    async isKnown(kind, slug) {
      const now = options.now();
      const current = entries.get(kind);
      const fresh = current !== undefined && now - current.loadedAt < ttl;
      if (fresh && current.slugs.has(slug)) return true;
      if (current === undefined || !fresh) {
        const reloadAllowed = current === undefined || now - current.refreshedAt >= minRefresh;
        const entry = reloadAllowed ? await refresh(kind) : current;
        if (entry === null) return null;
        return entry.slugs.has(slug);
      }
      // Fresh set without this slug: refresh once if allowed, then decide.
      if (now - current.refreshedAt < minRefresh) return false;
      const entry = await refresh(kind);
      if (entry === null) return null;
      return entry.slugs.has(slug);
    },
  };
}
