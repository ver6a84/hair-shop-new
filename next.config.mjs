/** @type {import('next').NextConfig} */
const nextConfig = {
  // ukrainian pages keep their current urls, russian ones live under /ru
  i18n: {
    locales: ['uk', 'ru'],
    defaultLocale: 'uk',
    // no redirects by Accept-Language: google must see the same page on the same url
    localeDetection: false,
  },
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
