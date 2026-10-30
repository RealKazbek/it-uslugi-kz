import type { IconType } from 'react-icons';
import { SiInstagram, SiTelegram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

const CHANNELS: { name: string; Icon: IconType }[] = [
  { name: 'WhatsApp', Icon: SiWhatsapp },
  { name: 'Telegram', Icon: SiTelegram },
  { name: 'Instagram', Icon: SiInstagram },
  { name: 'TikTok', Icon: SiTiktok },
];

/**
 * Channels a client's site or bot links to (buttons, links, chat bots). Plain labels, not links:
 * there are no Perne accounts on Instagram or TikTok (see `socials` in lib/site/contacts.ts).
 */
export function ChannelsStrip({ title }: { title: string }) {
  return (
    <Container className="-mt-4 md:-mt-10">
      <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted px-6 py-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="max-w-md font-semibold">{title}</p>
        <ul className="flex flex-wrap justify-center gap-3">
          {CHANNELS.map(({ name, Icon }) => (
            <li key={name} className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-semibold">
              <Icon aria-hidden="true" className="size-5 text-foreground" />
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
