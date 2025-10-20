/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.perukytyt.com',
        pathname: '/**',
      },
    ],
  },
}


export default nextConfig;
