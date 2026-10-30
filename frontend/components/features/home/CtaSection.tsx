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

/** Closing call to action: a red panel with WhatsApp (white button) and Telegram (outline). */
export function CtaSection({ title, text, whatsappLabel, whatsappHref, telegramLabel, telegramHref }: CtaSectionProps) {
  return (
    <Section labelledBy="cta">
      <Container>
        <div className="space-y-6 rounded-3xl bg-primary p-8 text-primary-foreground shadow-pop md:p-14">
          <h2 id="cta" className="text-3xl font-extrabold md:text-4xl">
            {title}
          </h2>
          <p className="max-w-prose text-lg text-primary-foreground">{text}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={whatsappHref} size="lg" className="bg-background text-foreground hover:bg-background/90">
              <SiWhatsapp aria-hidden="true" />
              {whatsappLabel}
            </ButtonLink>
            <ButtonLink href={telegramHref} size="lg" variant="ghost" className="border border-primary-foreground/60 text-primary-foreground hover:bg-primary-hover">
              <SiTelegram aria-hidden="true" />
              {telegramLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
