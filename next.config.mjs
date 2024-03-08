/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { // TODO: fix the code so it unnecessary to use this - main cause of problems is using searchParams
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: false // fixed rendering twice
};

export default nextConfig;
