/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Proxy x402 discovery docs from the brand domain to the API host.
    // Server-side rewrite (not redirect) so buyer agents probing the brand
    // domain get the manifest body back at `solprobe.xyz/...` without a hop.
    // The API host already sets `Access-Control-Allow-Origin: *`, so CORS
    // survives the proxy for browser-agent callers.
    return [
      {
        source: "/.well-known/:path*",
        destination: "https://api.solprobe.xyz/.well-known/:path*",
      },
      {
        source: "/openapi.json",
        destination: "https://api.solprobe.xyz/openapi.json",
      },
      {
        source: "/llm.txt",
        destination: "https://api.solprobe.xyz/llm.txt",
      },
    ];
  },
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
