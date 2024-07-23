'use client';

import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { baseSepolia, Chain, localhost } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { createWagmiConfig } from '@/store/createWagmiConfig';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

let rpcUrl = 'https://sepolia.base.org';
let chain: Chain = baseSepolia;

if (process.env.NODE_ENV === 'development') {
  rpcUrl = 'http://127.0.0.1:8545';
  chain = localhost;
}

const wagmiConfig = createWagmiConfig(rpcUrl);

function OnchainProviders({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={chain}>{children}</OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
