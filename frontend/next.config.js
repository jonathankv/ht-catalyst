const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['public.readdy.ai'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    const securityHeaders = [
      // Prevent MIME type sniffing
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Clickjacking protection
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      // Basic referrer policy
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Restrictive cross-origin opener policy
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      // Restrictive cross-origin resource policy
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      // Permissions policy (adjust as needed)
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      // Content Security Policy (adjust when adding external sources)
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self'", // allow API calls to same-origin; extend with backend origin in prod if different
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join('; '),
      },
    ];

    return [
      {
        // Apply security headers site-wide
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public assets with long TTL
        source: '/public/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
}

module.exports = nextConfig 