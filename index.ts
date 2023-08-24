import { type Block } from 'viem'
import { client } from './viem/client'

/**
 *  Write some viem things here
 * */
let latestBlock: Block

client.watchBlocks({
  onBlock: (block) => {
    console.log(block)
    latestBlock = block
  },
})
