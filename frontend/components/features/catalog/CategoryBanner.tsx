import Image from 'next/image';
import { categoryImage } from '@/lib/media/images';

interface CategoryBannerProps {
  slug: string;
  title: string;
  intro: string;
}

/** Wide category photo with a dark gradient and the heading on top (LCP image of the hub page). */
export function CategoryBanner({ slug, title, intro }: CategoryBannerProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl bg-foreground">
      <Image src={categoryImage(slug)} alt="" fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/20" />
      <div className="flex min-h-56 flex-col justify-end gap-3 p-6 sm:min-h-72 sm:p-10">
        <h1 className="max-w-3xl text-h2 tracking-tight text-background">{title}</h1>
        <p className="max-w-2xl text-base text-background/90 sm:text-lg">{intro}</p>
      </div>
    </div>
  );
}
