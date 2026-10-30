/**
 * The only module that reads process.env. Server-side only (INTERNAL_API_TOKEN must never reach the client).
 */
export interface AppConfig {
  apiInternalUrl: string;
  siteUrl: string;
  usdRate: number;
  /** Russian names of cities where on-site work is offered (ONSITE_CITIES, comma separated). */
  onsiteCities: string[];
  /** Daily working hours shown in the footer (WORKING_HOURS), e.g. "09:00–21:00". Empty hides the line. */
  workingHours: string;
  /** Social profile URLs (INSTAGRAM_URL, TIKTOK_URL). Empty hides the icon. */
  instagramUrl: string;
  tiktokUrl: string;
}

const DEFAULT_API_URL = 'http://localhost:8000';
const DEFAULT_SITE_URL = 'https://uslugi.realkazbek.site';
const DEFAULT_USD_RATE = 500;
const DEFAULT_ONSITE_CITIES = ['Алматы'];

function readList(raw: string | undefined, fallback: string[]): string[] {
  const items = (raw ?? '').split(',').map((item) => item.trim()).filter(Boolean);
  return items.length > 0 ? items : fallback;
}

function readUsdRate(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === '') return DEFAULT_USD_RATE;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`USD_RATE must be a positive number, got "${raw}"`);
  }
  return value;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    apiInternalUrl: stripTrailingSlash(env.API_INTERNAL_URL?.trim() || DEFAULT_API_URL),
    siteUrl: stripTrailingSlash(env.SITE_URL?.trim() || DEFAULT_SITE_URL),
    usdRate: readUsdRate(env.USD_RATE),
    onsiteCities: readList(env.ONSITE_CITIES, DEFAULT_ONSITE_CITIES),
    workingHours: env.WORKING_HOURS?.trim() ?? '09:00–21:00',
    instagramUrl: env.INSTAGRAM_URL?.trim() ?? '',
    tiktokUrl: env.TIKTOK_URL?.trim() ?? '',
  };
}

export const config: AppConfig = loadConfig();

/** Server only. Returns '' when unset, so callers must deny access on empty. */
export function internalApiToken(env: NodeJS.ProcessEnv = process.env): string {
  return env.INTERNAL_API_TOKEN ?? '';
}
