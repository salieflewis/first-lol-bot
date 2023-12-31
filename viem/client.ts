import { createPublicClient, createWalletClient, http, type Hash } from 'viem';
import { zora, zoraTestnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const transport = http('https://rpc.zora.energy');

export const publicClient = createPublicClient({
  chain: zora,
  transport,
});

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hash);

export const walletClient = createWalletClient({
  account,
  chain: zora,
  transport: http(),
});
