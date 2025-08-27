/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3050',
        pathname: '/uploads/properties/**'
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        pathname: '/public/sample-products/**'
      }
    ]
    // Optionally, allow production API as well
    // domains: ['api.netra.com.ar'],
  }
};

module.exports = nextConfig;
