/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'trello.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
      ],
    },}
  
  module.exports = nextConfig
  