import {assertNotNull} from '@subsquid/util-internal'
import * as ss58 from '@subsquid/ss58'
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
    // TODO: add dev env check and use the following two gateways
    // https://v2.archive.subsquid.io/network/aleph-zero │
    // https://v2.archive.subsquid.io/network/aleph-zero-testnet 
    // RPC endpoints should also be added to this dev env check, 
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
        // TODO: pass in the earliest contract deployment block we have here, better as env var as its also needed in main.ts
        // ideally we should automagically read this
        from: 58879836
    })

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
