/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/api",
        destination: "https://api.solprobe.xyz/",
        permanent: true,
      },
      // Docs live on GitBook at docs.solprobe.xyz, confirmed public + stable —
      // permanent (308) redirects. Note GitBook prefixes pages by section
      // (/reference/*, /access-paths/*), so /docs/:path* is a best-effort
      // forward; the old /docs route was a single page with no real subpaths.
      {
        source: "/docs",
        destination: "https://docs.solprobe.xyz",
        permanent: true,
      },
      {
        source: "/docs/:path*",
        destination: "https://docs.solprobe.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
