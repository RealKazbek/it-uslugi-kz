import { SiInstagram, SiTiktok } from 'react-icons/si';
import { socials } from '@/lib/site/contacts';

/** Brand icons for social profiles. Each one renders only when its URL is set in lib/site/contacts.ts. */
export function FooterSocials() {
  const { instagram, tiktok } = socials;
  if (!instagram && !tiktok) return null;

  const linkClass = 'flex size-11 items-center justify-center rounded-lg text-foreground hover:bg-background';
  return (
    <ul className="flex gap-2">
      {instagram && (
        <li>
          <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={linkClass}>
            <SiInstagram size={22} aria-hidden="true" />
          </a>
        </li>
      )}
      {tiktok && (
        <li>
          <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={linkClass}>
            <SiTiktok size={22} aria-hidden="true" />
          </a>
        </li>
      )}
    </ul>
  );
}
