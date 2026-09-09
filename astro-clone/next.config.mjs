/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Low-memory build host: avoid spawning multiple static-export workers.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
