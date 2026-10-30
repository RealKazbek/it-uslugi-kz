import { describe, expect, it, vi } from 'vitest';
import { clearRecent, pushRecent, readRecent, RECENT_KEY, RECENT_LIMIT, writeRecent, type KeyValueStore } from './recent';

/** In-memory store. `broken` makes every call throw, like a blocked or full localStorage. */
function memoryStore(initial: Record<string, string> = {}, broken = false): KeyValueStore & { data: Record<string, string> } {
  const data = { ...initial };
  const fail = (): never => {
    throw new DOMException('blocked', 'SecurityError');
  };
  return {
    data,
    getItem: (key) => (broken ? fail() : (data[key] ?? null)),
    setItem: (key, value) => {
      if (broken) fail();
      data[key] = value;
    },
    removeItem: (key) => {
      if (broken) fail();
      delete data[key];
    },
  };
}

describe('pushRecent', () => {
  it('puts the newest query first and trims whitespace', () => {
    expect(pushRecent(['a'], '  bot   for shop ')).toEqual(['bot for shop', 'a']);
  });

  it('drops case-insensitive duplicates and keeps the newest copy', () => {
    expect(pushRecent(['Bot', 'crm'], 'bot')).toEqual(['bot', 'crm']);
  });

  it('ignores blank queries', () => {
    expect(pushRecent(['a'], '   ')).toEqual(['a']);
  });

  it('keeps at most RECENT_LIMIT entries', () => {
    const full = ['1', '2', '3', '4', '5', '6'];
    const next = pushRecent(full, 'new');
    expect(next).toHaveLength(RECENT_LIMIT);
    expect(next[0]).toBe('new');
    expect(next).not.toContain('6');
  });
});

describe('readRecent', () => {
  it('returns the stored list', () => {
    expect(readRecent(memoryStore({ [RECENT_KEY]: JSON.stringify(['bot', 'crm']) }))).toEqual(['bot', 'crm']);
  });

  it('returns [] when there is no store or nothing is stored', () => {
    expect(readRecent(null)).toEqual([]);
    expect(readRecent(memoryStore())).toEqual([]);
  });

  it('returns [] and warns when the store throws', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(readRecent(memoryStore({}, true))).toEqual([]);
    expect(warn).toHaveBeenCalledWith('[search] recent searches unreadable', { error: 'SecurityError' });
    warn.mockRestore();
  });

  it('returns [] for corrupt JSON, non-array JSON, and drops non-string items', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    expect(readRecent(memoryStore({ [RECENT_KEY]: '{oops' }))).toEqual([]);
    expect(readRecent(memoryStore({ [RECENT_KEY]: '{"a":1}' }))).toEqual([]);
    expect(readRecent(memoryStore({ [RECENT_KEY]: JSON.stringify(['ok', 3, null]) }))).toEqual(['ok']);
    warn.mockRestore();
  });
});

describe('writeRecent and clearRecent', () => {
  it('writes the list under the agreed key', () => {
    const store = memoryStore();
    writeRecent(store, ['bot']);
    expect(JSON.parse(store.data[RECENT_KEY] ?? 'null')).toEqual(['bot']);
  });

  it('does not throw when the store is blocked', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const store = memoryStore({}, true);
    expect(() => writeRecent(store, ['bot'])).not.toThrow();
    expect(() => clearRecent(store)).not.toThrow();
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it('clears the key', () => {
    const store = memoryStore({ [RECENT_KEY]: '["x"]' });
    clearRecent(store);
    expect(store.data[RECENT_KEY]).toBeUndefined();
  });
});
