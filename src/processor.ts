import {assertNotNull} from '@subsquid/util-internal'
import {toHex} from '@subsquid/util-internal-hex'
import * as ss58 from '@subsquid/ss58'
import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'

export const SS58_NETWORK = 'aleph-zero-testnet'

const CONTRACT_ADDRESS_SS58 = '5G12m7C274qk6MVuW9Vb5Dno31EBVcRuPt85yYE1wQ5ZRTnq'
export const CONTRACT_ADDRESS = ss58.codec(42).decode(CONTRACT_ADDRESS_SS58)

export const processor = new SubstrateBatchProcessor()
    .setGateway('https://v2.archive.subsquid.io/network/aleph-zero-testnet')
    .setRpcEndpoint({
        url: assertNotNull(process.env.RPC_ENDPOINT),
        rateLimit: 10
    })
    .addContractsContractEmitted({
        contractAddress: [CONTRACT_ADDRESS],
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
        // genesis block happens to not have a timestamp, so it's easier
        // to start from 1 in cases when the deployment height is unknown
        from: 58879836
    })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
