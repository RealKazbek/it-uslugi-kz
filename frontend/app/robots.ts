import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

/** Served at /robots.txt. Everything is allowed except the API; the sitemap is announced. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}
