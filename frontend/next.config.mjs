/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Photos are pre-sized WebP files (scripts/media-variants.sh); the loader maps a width to a file.
  images: {
    loader: 'custom',
    loaderFile: './lib/media/loader.ts',
    deviceSizes: [640, 828, 1200],
    imageSizes: [256, 384],
  },
  // File names are not content-hashed, so a week rather than immutable: a replaced photo shows up within days.
  async headers() {
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }];
    return [
      { source: '/media/:path*', headers: cache },
      { source: '/portfolio/:path*', headers: cache },
    ];
  },
};

export default nextConfig;
