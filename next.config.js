/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Silence noisy dynamic require warnings from Sentry / OpenTelemetry
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /require-in-the-middle/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
