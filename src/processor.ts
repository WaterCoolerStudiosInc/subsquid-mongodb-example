import 'dotenv/config';
import {assertNotNull} from '@subsquid/util-internal'
import * as ss58 from '@subsquid/ss58'
import {
    SubstrateBatchProcessor,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'
import { KintsuContract } from './utils/get-contracts.js';
import { startIndexingVault } from './index-events.js';
import { MongoDBDatabase } from './mongo-database.js';

export async function startProcessor(contract: KintsuContract, mongoDB: MongoDBDatabase) {
    const SS58_NETWORK = process.env.NETWORK || 'alephzero-testnet'
    const VAULT_CONTRACT_ADDRESS = ss58.codec(42).decode(assertNotNull(contract?.address, 'Vault contract address must be provided'))
    
    // https://v2.archive.subsquid.io/network/aleph-zero │
    // https://v2.archive.subsquid.io/network/aleph-zero-testnet 
    // RPC endpoints should also be added to this dev env check, 
    const GATEWAY_URL = SS58_NETWORK === 'aleph-zero' ? 'https://v2.archive.subsquid.io/network/aleph-zero' : 'https://v2.archive.subsquid.io/network/aleph-zero-testnet '
    
    const processor = new SubstrateBatchProcessor()
        .setGateway(GATEWAY_URL)
        .setRpcEndpoint({
            url: assertNotNull(process.env.RPC_ENDPOINT, 'RPC endpoint must be provided')
        })
        .addContractsContractEmitted({
            contractAddress: [VAULT_CONTRACT_ADDRESS],
            extrinsic: true
        })
        .setFields({
            block: {
                timestamp: true
            },
            extrinsic: {
                hash: true
            }
        })
        .setBlockRange({
            from: contract?.blockNumber || 1
        })

    processor.run(mongoDB, async (ctx: any) => {
        console.log("PROCESSING LOOP")
        await startIndexingVault(contract, ctx)
    })
}
