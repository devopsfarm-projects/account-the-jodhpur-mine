import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps for Bootstrap
  webpack: (config) => {
    config.module.rules.push({
      test: /bootstrap\.min\.css\.map$/,
      use: 'null-loader'
    });
    return config;
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
