/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/webp'] },
  experimental: { globalNotFound: true },
  // Only the exact /ru/ trailing-slash form gets a direct 301. /ru and /ru/... go through the middleware.
  async redirects() {
    return [{ source: '/ru/', destination: '/', statusCode: 301 }];
  },
};

export default nextConfig;
