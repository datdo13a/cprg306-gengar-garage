/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
        port: '',          // leave empty for default HTTPS port
        pathname: '/**',   // allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
