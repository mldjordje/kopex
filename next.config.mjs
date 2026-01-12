/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.kopexmin.rs' },
      { protocol: 'https', hostname: 'www.kopexmin.rs' },
      { protocol: 'https', hostname: 'kopexmin.rs' }
    ]
  }
};

export default nextConfig;
