#!/bin/sh
# Writes responsive width variants (name-256.webp ... name-828.webp) next to every source photo in
# public/media and public/portfolio. The source file itself serves as the widest (1200px) variant.
# Used by lib/media/loader.ts, so no image is resized at runtime. Needs ImageMagick (`magick`).
set -eu
cd "$(dirname "$0")/../public"
for src in $(find media portfolio -name '*.webp' | grep -Ev -- '-(256|384|640|828)\.webp$'); do
  for w in 256 384 640 828; do
    out="${src%.webp}-$w.webp"
    [ -f "$out" ] || magick "$src" -resize "${w}x" -quality 72 -define webp:method=6 "$out"
  done
done
