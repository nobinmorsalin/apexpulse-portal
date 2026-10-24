import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/admin/'],
    },
    sitemap: 'https://apexpulse-portal.vercel.app/sitemap.xml',
  };
}
