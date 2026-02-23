/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Note: CSP is intentionally conservative to avoid breaking Next/Unsplash.
          // Tighten further once you finalize third-party scripts and domains.
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              "base-uri 'self'; " +
              "frame-ancestors 'none'; " +
              "img-src 'self' https://images.unsplash.com data: blob:; " +
              "font-src 'self' data:; " +
              "style-src 'self' 'unsafe-inline'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
              "connect-src 'self' https://*.supabase.co https://api.stripe.com; " +
              "object-src 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
