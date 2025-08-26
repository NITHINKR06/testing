/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
        port: '',
        pathname: '/firebasejs/ui/2.0.0/images/auth/**',
      },
    ],
  },
};

export default nextConfig;