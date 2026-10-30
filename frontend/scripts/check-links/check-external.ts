import type { Problem } from './types';

const PHONE = /^tel:\+\d{7,15}$/;
const EMAIL = /^mailto:[^\s@?]+@[^\s@?]+\.[^\s@?]+(\?\S*)?$/;

interface HostRule {
  host: string;
  path: RegExp;
  label: string;
}

/** Contact networks whose link shape we know. Other hosts only need a valid http(s) URL. */
const HOST_RULES: HostRule[] = [
  { host: 'wa.me', path: /^\/\d{6,15}\/?$/, label: 'wa.me/<digits>' },
  { host: 't.me', path: /^\/[A-Za-z][A-Za-z0-9_]{4,31}\/?$/, label: 't.me/<username>' },
  { host: 'instagram.com', path: /^\/[A-Za-z0-9._-]+(\/[A-Za-z0-9._-]+)*\/?$/, label: 'instagram.com/<name>' },
  { host: 'tiktok.com', path: /^\/@[A-Za-z0-9._]{2,24}\/?$/, label: 'tiktok.com/@<name>' },
];

/** Pure, no network: returns the format problem of an external or contact href, or null when it is valid. */
export function checkExternal(href: string): string | null {
  const lower = href.toLowerCase();
  if (lower.startsWith('tel:')) return PHONE.test(href) ? null : 'phone must look like tel:+<7-15 digits>';
  if (lower.startsWith('mailto:')) return EMAIL.test(href) ? null : 'email must look like mailto:name@domain.tld';
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return 'unparseable external URL';
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return `unsupported scheme: ${url.protocol}`;
  const host = url.hostname.replace(/^www\./, '');
  const rule = HOST_RULES.find((candidate) => candidate.host === host);
  if (!rule) return null;
  if (url.protocol !== 'https:') return `${rule.label} must use https`;
  return rule.path.test(url.pathname) ? null : `not a valid ${rule.label} link`;
}

export interface ContactCheck {
  problems: Problem[];
  /** Keys whose value is empty: not an error, the speed dial hides them. */
  notConfigured: string[];
}

/** Pure: validates every configured contact href (CONTACTS in lib/site/contacts.ts). */
export function checkContacts(contacts: Readonly<Record<string, string>>): ContactCheck {
  const result: ContactCheck = { problems: [], notConfigured: [] };
  for (const [key, href] of Object.entries(contacts)) {
    if (href.trim() === '') {
      result.notConfigured.push(key);
      continue;
    }
    const reason = checkExternal(href);
    if (reason) result.problems.push({ page: 'CONTACTS', link: href, reason: `${key}: ${reason}` });
  }
  return result;
}
