import { createConfig, http } from 'wagmi';
import { base, baseSepolia, localhost } from 'wagmi/chains';
import { coinbaseWallet, injected, metaMask } from 'wagmi/connectors'


export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');
  const localhostUrl = 'http://127.0.0.1:8545'

  const connectors = () => {
    if (process.env.NODE_ENV === 'production') {
      return [
      coinbaseWallet({
        appName: 'Onchain Affiliate',
        preference: 'smartWalletOnly',
      })]
    }

    return [
      injected()
    ]
  }

  return createConfig({
    chains: [baseSepolia,localhost,base],
    connectors: connectors(),
    ssr: true,
    transports: {
      [localhost.id]: http(localhostUrl),
      [baseSepolia.id]: http(baseSepoliaUrl),
      [base.id]: http(baseUrl),
    },
  });
}
