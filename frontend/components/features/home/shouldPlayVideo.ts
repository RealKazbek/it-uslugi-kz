export interface VideoPrefs {
  reducedMotion: boolean;
  saveData: boolean;
}

/** Decorative video plays only when the visitor asked neither for less motion nor for less data. */
export function shouldPlayVideo({ reducedMotion, saveData }: VideoPrefs): boolean {
  return !reducedMotion && !saveData;
}

interface ConnectionLike {
  saveData?: boolean;
}

/** Reads the visitor's preferences; browser-only (call after mount). */
export function readVideoPrefs(): VideoPrefs {
  const connection = (navigator as Navigator & { connection?: ConnectionLike }).connection;
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: connection?.saveData === true,
  };
}
