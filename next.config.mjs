/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // Added this to fix your current error
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // Keep this for standard ImgBB links
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For your Banner images
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google profile pics
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      }
    ],
  },
};

export default nextConfig;