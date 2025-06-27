const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/shree-cleaning-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/shree-cleaning-website/' : '',
}

export default nextConfig
