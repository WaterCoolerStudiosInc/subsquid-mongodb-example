import 'dotenv/config';
import {assertNotNull} from '@subsquid/util-internal'
import * as ss58 from '@subsquid/ss58'
import {
    SubstrateBatchProcessor,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic,
    SubstrateBatchProcessorFields,
    BlockHeader,
    DataHandlerContext
} from '@subsquid/substrate-processor'
import { address, blockNumber } from '@water-cooler-studios/kintsu-contracts/deployments/vault/alephzero-testnet.js'

export const VAULT_CONTRACT_ADDRESS = ss58.codec(42).decode(assertNotNull(address, 'Vault contract address must be provided'))

// https://v2.archive.subsquid.io/network/aleph-zero │
// https://v2.archive.subsquid.io/network/aleph-zero-testnet 
// RPC endpoints should also be added to this dev env check, 
const GATEWAY_URL = process.env.NETWORK === 'aleph-zero' ? 'https://v2.archive.subsquid.io/network/aleph-zero' : 'https://v2.archive.subsquid.io/network/aleph-zero-testnet'

export const processor = new SubstrateBatchProcessor()
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
        from: blockNumber || 1
    })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>

