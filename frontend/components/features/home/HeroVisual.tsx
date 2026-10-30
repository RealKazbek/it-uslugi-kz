'use client';

import { Bot, Globe } from 'lucide-react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { heroImages } from '@/lib/media/images';
import { BackgroundVideo } from './BackgroundVideo';
import { EASE_OUT } from '@/components/motion/presets';

interface HeroVisualProps {
  chips: { first: string; second: string };
}

function Chip({ icon, text, className, delay }: { icon: React.ReactNode; text: string; className: string; delay: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
      className={`absolute flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-card-foreground shadow-pop ${className}`}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">{icon}</span>
      {text}
    </m.div>
  );
}

/** Laptop-in-browser frame with an overlapping phone and two floating chips. Decorative: images have empty alt. */
export function HeroVisual({ chips }: HeroVisualProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative mx-auto w-full max-w-xl pb-10 pr-6 sm:pr-10"
      aria-hidden="true"
    >
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-pop">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <div className="relative aspect-[3/2]">
          <BackgroundVideo src="/media/video/hero" />
        </div>
      </div>
      <div className="absolute -bottom-2 right-0 w-28 overflow-hidden rounded-[2rem] border-4 border-foreground bg-foreground shadow-pop sm:w-36">
        <div className="relative aspect-[9/16]">
          <Image src={heroImages.phone} alt="" fill sizes="144px" className="object-cover" />
        </div>
      </div>
      <Chip icon={<Bot className="size-4" />} text={chips.first} delay={0.5} className="-left-1 top-10 sm:-left-4" />
      <Chip icon={<Globe className="size-4" />} text={chips.second} delay={0.7} className="bottom-2 left-3 sm:left-6" />
    </m.div>
  );
}
