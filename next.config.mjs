/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 960, 1200, 1536],
    imageSizes: [96, 192, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.kopexmin.rs' },
      { protocol: 'https', hostname: 'www.kopexmin.rs' },
      { protocol: 'https', hostname: 'kopexmin.rs' }
    ]
  }
};

export default nextConfig;
