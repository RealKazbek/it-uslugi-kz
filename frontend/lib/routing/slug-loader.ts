import type { SlugKind, SlugPayload } from './slug-types';

export interface Snapshot {
  sets: Record<SlugKind, Set<string>>;
  loadedAt: number;
}

export interface SlugLoaderOptions {
  load: () => Promise<SlugPayload | null>;
  now: () => number;
  backoffMs: number;
  onFailure?: (message: string) => void;
}

export interface SlugLoader {
  /** Shared, single in-flight load. Records the attempt time before awaiting. */
  attempt: () => Promise<boolean>;
  canAttempt: (now: number) => boolean;
  snapshot: () => Snapshot | null;
  /** True while a load is running (callers should wait for it instead of starting another). */
  loading: () => boolean;
}

/** One load at a time. Failures keep the previous snapshot and block new attempts for `backoffMs`. */
export function createSlugLoader(options: SlugLoaderOptions): SlugLoader {
  let current: Snapshot | null = null;
  let lastAttemptAt = Number.NEGATIVE_INFINITY;
  let inflight: Promise<boolean> | null = null;

  const failed = (): boolean => {
    options.onFailure?.('slug set unavailable');
    return false;
  };

  async function run(): Promise<boolean> {
    try {
      const data = await options.load();
      if (data === null) return failed();
      current = {
        sets: { products: new Set(data.products), categories: new Set(data.categories), cities: new Set(data.cities) },
        loadedAt: options.now(),
      };
      return true;
    } catch {
      return failed();
    }
  }

  return {
    attempt(): Promise<boolean> {
      if (inflight) return inflight;
      lastAttemptAt = options.now();
      inflight = run().finally(() => {
        inflight = null;
      });
      return inflight;
    },
    canAttempt: (now) => now - lastAttemptAt >= options.backoffMs,
    snapshot: () => current,
    loading: () => inflight !== null,
  };
}
