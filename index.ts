import { type Block, type Hex } from 'viem';
import { publicClient, walletClient } from './viem/client';
import { firstAbi } from './abi/firstAbi';

async function claimBlock() {
  const { request } = await publicClient.simulateContract({
    address: process.env.FIRST_CONTRACT as Hex,
    abi: firstAbi,
    functionName: 'claimBlock',
  });
  const hash = await walletClient.writeContract(request);
  console.log('Transaction hash: ', hash)
}

publicClient.watchBlocks({
  onBlock: async () => {
    await claimBlock();
  },
});
