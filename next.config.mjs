/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false, // ← disable strict Link href typing
  },
};

export default nextConfig;
