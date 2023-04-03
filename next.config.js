/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'earbhfzccdgjsmqbynfy.supabase.co',
        port: '',
        pathname: '**',
      },
      {
        hostname: '*.googleusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig
