/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api",
        destination: "https://api.solprobe.xyz/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
