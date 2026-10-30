// next/image loader for the pre-sized local photos (scripts/media-variants.sh). Nothing is resized at
// runtime: the server's image optimizer could hang on a request the browser aborted mid-resize.

/** Widths that exist as `name-{w}.webp`; anything wider uses the 1200px source file. */
export const VARIANT_WIDTHS = [256, 384, 640, 828] as const;

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function mediaLoader({ src, width }: LoaderArgs): string {
  if (!/^\/media\/.+\.webp$/.test(src)) return src;
  const variant = VARIANT_WIDTHS.find((w) => w >= width);
  return variant === undefined ? src : src.replace(/\.webp$/, `-${variant}.webp`);
}
