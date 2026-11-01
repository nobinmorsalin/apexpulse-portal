/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.ts',
        destination: '/sitemap.xml',
      },
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
