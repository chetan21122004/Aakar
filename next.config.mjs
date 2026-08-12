/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
      { source: "/collections/:slug", destination: "/products/:slug", permanent: true },
      { source: "/categories/:slug", destination: "/the-console", permanent: true },
    ]
  },
}

export default nextConfig
