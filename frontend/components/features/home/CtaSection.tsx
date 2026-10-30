import { SiTelegram, SiWhatsapp } from 'react-icons/si';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface CtaSectionProps {
  title: string;
  text: string;
  whatsappLabel: string;
  whatsappHref: string;
  telegramLabel: string;
  telegramHref: string;
}

/** Closing call to action: a tinted panel with WhatsApp (green) and Telegram (outline). */
export function CtaSection({ title, text, whatsappLabel, whatsappHref, telegramLabel, telegramHref }: CtaSectionProps) {
  return (
    <Section labelledBy="cta">
      <Container>
        <div className="space-y-6 rounded-xl border border-line bg-surface-tint p-8 text-ink md:p-14">
          <h2 id="cta" className="text-h2">
            {title}
          </h2>
          <p className="max-w-prose text-body-lg text-ink-muted">{text}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={whatsappHref} size="lg" variant="whatsapp">
              <SiWhatsapp aria-hidden="true" />
              {whatsappLabel}
            </ButtonLink>
            <ButtonLink href={telegramHref} size="lg" variant="telegram">
              <SiTelegram aria-hidden="true" />
              {telegramLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
