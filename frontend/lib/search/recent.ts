/** Minimal Storage surface, so the logic runs against any store (and a throwing fake in tests). */
export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const RECENT_KEY = 'perne:recent-searches';
export const RECENT_LIMIT = 6;

/** Adds a query to the front, dropping blanks and case-insensitive duplicates. Pure. */
export function pushRecent(list: readonly string[], query: string): string[] {
  const clean = query.trim().replace(/\s+/g, ' ');
  if (clean === '') return [...list];
  const rest = list.filter((item) => item.toLowerCase() !== clean.toLowerCase());
  return [clean, ...rest].slice(0, RECENT_LIMIT);
}

/** Reads the stored list. Any failure (no store, blocked storage, bad JSON) yields an empty list and a warning. */
export function readRecent(store: KeyValueStore | null): string[] {
  if (store === null) return [];
  try {
    const raw = store.getItem(RECENT_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string').slice(0, RECENT_LIMIT);
  } catch (cause) {
    console.warn('[search] recent searches unreadable', { error: errorName(cause) });
    return [];
  }
}

/** Persists the list. A failed write is logged and otherwise ignored (recent searches are a convenience). */
export function writeRecent(store: KeyValueStore | null, list: readonly string[]): void {
  if (store === null) return;
  try {
    store.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_LIMIT)));
  } catch (cause) {
    console.warn('[search] recent searches not saved', { error: errorName(cause) });
  }
}

export function clearRecent(store: KeyValueStore | null): void {
  if (store === null) return;
  try {
    store.removeItem(RECENT_KEY);
  } catch (cause) {
    console.warn('[search] recent searches not cleared', { error: errorName(cause) });
  }
}

/** The browser's localStorage, or null when it is absent or blocked (reading it can throw). */
export function browserStore(): KeyValueStore | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch (cause) {
    console.warn('[search] localStorage blocked', { error: errorName(cause) });
    return null;
  }
}

function errorName(cause: unknown): string {
  return cause instanceof Error ? cause.name : 'unknown';
}
