import { Abi, Address } from 'abitype';
import { base, baseSepolia, localhost } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { Web3AffiliateContractABI } from './Web3AffiliateContractABI';


const nullAddress: Address = '0x0000000000000000000000000000000000000000';

export const useWeb3AffiliateContract = generateContractHook({
  abi: Web3AffiliateContractABI as Abi,
  1337: {
    chain: localhost,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  [base.id]: {
    chain: base,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as Address,
  },
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: (process.env.CONTRACT_ADDRESS ?? nullAddress) as Address,
  },
  // ... more chains for this contract go here
});
