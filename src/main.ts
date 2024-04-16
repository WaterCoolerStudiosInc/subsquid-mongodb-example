import {In} from 'typeorm'
import assert from 'assert'

import * as ss58 from '@subsquid/ss58'
import {Store, TypeormDatabase} from '@subsquid/typeorm-store'

import * as erc20 from './abi/erc20'
import * as vault from './abi/vault'
import {Owner, Transfer} from "./model"
import {
    processor,
    SS58_NETWORK,
    CONTRACT_ADDRESS,
} from './processor'
import { MongoDBDatabase } from './mongo-database'
/**
 *   pub struct Staked {
        #[ink(topic)]
        staker: AccountId,
        azero: Balance,
        new_shares: Balance,
    }
    #[ink(event)]
    pub struct Restaked {
        azero: Balance,
        incentive: Balance,
    }
    #[ink(event)]
    pub struct UnlockRequested {
        #[ink(topic)]
        staker: AccountId,
        shares: Balance,
        batch_id: u64,
    }
    #[ink(event)]
    pub struct UnlockCanceled {
        #[ink(topic)]
        staker: AccountId,
        shares: Balance,
        batch_id: u64,
        unlock_id: u128,
    }
    #[ink(event)]
    pub struct BatchUnlockSent {
        #[ink(topic)]
        staker: AccountId,
        shares: Balance,
        spot_value: Balance,
        batch_id: u64,
    }
    #[ink(event)]
    pub struct UnlockRedeemed {
        #[ink(topic)]
        staker: AccountId,
        azero: Balance,
        batch_id: u64,
        unlock_id: u64,
    }
 */

const mongoDB = new MongoDBDatabase('mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin', 'aleph-indexer', 58879836)
    
processor.run(mongoDB, async ctx => {
    console.log("PROCESSING LOOP")
    await getUnlockRecords(ctx)
    await getBatchUnlockRecords(ctx)
    await getCancellationRecords(ctx)
    await getRedemptionRecord(ctx)
    await getStakeRecords(ctx)
    // await getTransferRecords(ctx)
})

async function getBatchUnlockRecords(ctx: any): Promise<void> {
    console.log('GETTING BATCH UNLOCK RECORDS')
    const collection = ctx.store.collection('BatchUnlockSent')
    const bulkOps = [] 

    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === CONTRACT_ADDRESS) {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                const decodedEvent = vault.decodeEvent(event.args.data)
                if (decodedEvent.__kind === 'BatchUnlockSent') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: { 
                                $set: {
                                    id: event.id,
                                    staker: decodedEvent.staker,
                                    shares: decodedEvent.shares,
                                    spot_value: decodedEvent.spotValue,
                                    batch_id: decodedEvent.batchId,
                                }
                            },
                            upsert: true
                        }
                    })
                }
            }
        }
    }
    if(bulkOps.length > 0){
        await collection.bulkWrite(bulkOps)
    }
}

async function getStakeRecords(ctx: any): Promise<void> {
    console.log('GETTING STAKE RECORDS')
    const collection = ctx.store.collection('Staked')
    const bulkOps = []

    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === CONTRACT_ADDRESS) {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                const decodedEvent = vault.decodeEvent(event.args.data)
                if (decodedEvent.__kind === 'Staked') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: { 
                                $set: {
                                    id: event.id,
                                    staker:decodedEvent.staker,
                                    azero:decodedEvent.azero,
                                    newShares:decodedEvent.newShares,  
                                }
                            },
                            upsert: true
                        }
                    })
                }
            }
        }
    }
    if(bulkOps.length > 0){
        await collection.bulkWrite(bulkOps)
    }
}

async function getUnlockRecords(ctx: any): Promise<void> {
    console.log('GETTING UNLOCK RECORDS')
    const collection = ctx.store.collection('UnlockRequested')
    const bulkOps = []
    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === CONTRACT_ADDRESS) {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                const decodedEvent = vault.decodeEvent(event.args.data)
                if (decodedEvent.__kind === 'UnlockRequested') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: { 
                                $set: {
                                    id: event.id,
                                    staker:decodedEvent.staker,
                                    shares:decodedEvent.shares,
                                    batch_id:decodedEvent.batchId,
                                }
                            },
                            upsert: true
                        }
                    })
                }
            }
        }
    }
    if(bulkOps.length > 0){
        await collection.bulkWrite(bulkOps)
    }
}

async function getCancellationRecords(ctx: any): Promise<void> {
    console.log('GETTING CANCELLATION RECORDS')
    const collection = ctx.store.collection('UnlockCanceled')
    const bulkOps = []

    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === CONTRACT_ADDRESS) {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                const decodedEvent = vault.decodeEvent(event.args.data)
                if (decodedEvent.__kind === 'UnlockCanceled') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: { 
                                $set: {
                                    id: event.id,
                                    staker:decodedEvent.staker,
                                    shares:decodedEvent.shares,
                                    batch_id:decodedEvent.batchId,
                                    unlock_id:decodedEvent.unlockId
                                }
                            },
                            upsert: true
                        }
                    })
                }
            }
        }
    }
    if(bulkOps.length > 0){
        await collection.bulkWrite(bulkOps)
    }
}

async function getRedemptionRecord(ctx: any): Promise<void> {
    console.log('GETTING REDEMPTION RECORDS')
    const collection = ctx.store.collection('UnlockRedeemed')
    const bulkOps = []
    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === CONTRACT_ADDRESS) {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                const decodedEvent = vault.decodeEvent(event.args.data)
                if (decodedEvent.__kind === 'UnlockRedeemed') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: { 
                                $set: {
                                    id: event.id,
                                    staker:decodedEvent.staker,
                                    unlock_id:decodedEvent.unlockId
                                }
                            },
                            upsert: true
                        }
                    })
                }
            }
        }
    }
    if(bulkOps.length > 0){
        await collection.bulkWrite(bulkOps)
    }
}

async function getTransferRecords(ctx: any): Promise<void> {
    const collection = ctx.store.collection('UnlockRedeemed')
    const bulkOps = []
    for (const block of ctx.blocks) {
        assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === CONTRACT_ADDRESS) {
                assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
                const decodedEvent = erc20.decodeEvent(event.args.data)
                if (decodedEvent.__kind === 'Transfer') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: { 
                                $set: {
                                    id: event.id,
                                    from: decodedEvent.from && ss58.codec(SS58_NETWORK).encode(decodedEvent.from),
                                    to: decodedEvent.to && ss58.codec(SS58_NETWORK).encode(decodedEvent.to),
                                    amount: decodedEvent.value,
                                    block: block.header.height,
                                    timestamp: new Date(block.header.timestamp),
                                    extrinsicHash: event.extrinsic.hash
                                }
                            },
                            upsert: true
                        }
                    })
                }
            }
        }
    }
    if(bulkOps.length > 0){
        await collection.bulkWrite(bulkOps)
    }
}
