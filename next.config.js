// This is the configuration file for Next.js.
// It sets up various settings for the Next.js application.

const nextConfig = {
  // Configure image domains for Next.js Image component.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vidalco.in',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'athletifi-s3.s3.us-east-2.amazonaws.com',
        port: '',
      },
    ],
  },
  // Enable React Strict Mode for better debugging and performance.
  reactStrictMode: true,
};

module.exports = nextConfig;
