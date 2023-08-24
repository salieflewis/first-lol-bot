import { type Block, type Hex, parseGwei, parseEther, type Hash } from 'viem';
import { publicClient, walletClient } from './viem/client';
import { firstAbi } from './abi/firstAbi';
import { privateKeyToAddress } from 'viem/accounts';

async function claimBlock() {
  // const gasEstimate = await publicClient.estimateGas({
  //   account: privateKeyToAddress(process.env.PRIVATE_KEY as Hash),
  //   data: '0x37dfbc4b',
  //   to: process.env.FIRST_CONTRACT as Hex,
  // });

  const { maxFeePerGas } = await publicClient.estimateFeesPerGas();

  const maxPriorityFeePerGas =
    await publicClient.estimateMaxPriorityFeePerGas();

  const { request } = await publicClient.simulateContract({
    address: process.env.FIRST_CONTRACT as Hex,
    abi: firstAbi,
    functionName: 'claimBlock',
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
  });
  const hash = await walletClient.writeContract(request);
  console.log('Transaction hash: ', hash);
}

publicClient.watchBlocks({
  onBlock: async () => {
    await claimBlock();
  },
});
