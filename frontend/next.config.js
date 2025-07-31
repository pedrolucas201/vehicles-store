console.log('🛠️  Next config carregado!');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000',
          pathname: '/uploads/**',
        },
        {
          protocol: 'https',
          hostname: 'uniao-motos.onrender.com',
          port: '',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  