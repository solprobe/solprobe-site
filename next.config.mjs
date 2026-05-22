/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api",
        destination: "https://api.solprobe.xyz/",
        permanent: true,
      },
      // Docs moved to GitBook at docs.solprobe.xyz. Redirect the old Next.js
      // /docs route (and any deep links) there. Temporary (307) during rollout
      // so it stays reversible and isn't browser-cached — flip both to
      // `permanent: true` (308) once the GitBook domain is confirmed stable.
      {
        source: "/docs",
        destination: "https://docs.solprobe.xyz",
        permanent: false,
      },
      {
        source: "/docs/:path*",
        destination: "https://docs.solprobe.xyz/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
