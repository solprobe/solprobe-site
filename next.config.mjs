/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // wagmi v2's connectors barrel statically imports all built-in connectors
    // (porto, metaMask, coinbaseWallet, walletConnect, safe, baseAccount).
    // We only use `injected`, so stub out the optional peer modules to `false`
    // so webpack drops their import branches at build time. Runtime is safe
    // because we never construct those connectors.
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "porto/internal": false,
      porto: false,
      "@safe-global/safe-apps-sdk": false,
      "@safe-global/safe-apps-provider": false,
      "@walletconnect/ethereum-provider": false,
      "@coinbase/wallet-sdk": false,
      "@metamask/sdk": false,
      "@metamask/connect-evm": false,
      "@base-org/account": false,
      accounts: false,
    };
    return config;
  },
};

export default nextConfig;
