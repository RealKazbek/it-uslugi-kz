import { SiInstagram, SiTiktok } from 'react-icons/si';
import { config } from '@/lib/config';

const linkClass =
  'flex size-11 items-center justify-center rounded-lg text-foreground transition-colors duration-fast hover:bg-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/** Brand icons for social profiles. Each renders only when its URL is set in config (INSTAGRAM_URL, TIKTOK_URL). */
export function FooterSocials() {
  const { instagramUrl: instagram, tiktokUrl: tiktok } = config;
  if (!instagram && !tiktok) return null;
  return (
    <ul className="-ml-3 flex gap-1">
      {instagram && (
        <li>
          <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}>
            <SiInstagram size={20} aria-hidden="true" />
          </a>
        </li>
      )}
      {tiktok && (
        <li>
          <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={linkClass}>
            <SiTiktok size={20} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  );
}
