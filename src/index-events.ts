import assert from 'assert'
import * as ss58 from '@subsquid/ss58'

import * as erc20 from './abi/erc20'
import * as vault from './abi/vault'
import {
  SS58_NETWORK,
  CONTRACT_ADDRESS,
} from './processor'
import { DataHandlerContext } from '@subsquid/substrate-processor'
import { Db } from 'mongodb'


/*
TODO
- Start tracking total shares and total pooled
- Create user object and start tracking their 
*/
export async function getBatchUnlockRecords(
    ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  console.log('GETTING BATCH UNLOCK RECORDS')
  const collection = ctx.store.collection('batch_unlocks')
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
                                  shares: decodedEvent.shares.toString(),
                                  spot_value: decodedEvent.spotValue.toString(),
                                  batch_id: decodedEvent.batchId.toString(),
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

export async function getStakeRecords(
  ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  console.log('GETTING STAKE RECORDS')
  const collection = ctx.store.collection('stakes')
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
                                  azero:decodedEvent.azero.toString(),
                                  newShares:decodedEvent.newShares.toString(),  
                              } 
                          },
                          upsert: true
                      }
                  })

                  // save total_shares 
              }
          }
      }
  }
  if(bulkOps.length > 0){
      await collection.bulkWrite(bulkOps)
  }
}

export async function getUnlockRecords(
  ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  console.log('GETTING UNLOCK RECORDS')
  const collection = ctx.store.collection('unlock_requests')
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
                                  shares:decodedEvent.shares.toString(),
                                  batch_id:decodedEvent.batchId.toString(),
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

export async function getCancellationRecords(
  ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  console.log('GETTING CANCELLATION RECORDS')
  const collection = ctx.store.collection('unlock_cancels')
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
                                  shares:decodedEvent.shares.toString(),
                                  batch_id:decodedEvent.batchId.toString(),
                                  unlock_id:decodedEvent.unlockId.toString()
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

export async function getRedemptionRecord(
  ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  console.log('GETTING REDEMPTION RECORDS')
  const collection = ctx.store.collection('unlock_redeems')
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
                                  unlock_id:decodedEvent.unlockId.toString()
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

export async function getTransferRecords(
  ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  const collection = ctx.store.collection('transfers')
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
                                  amount: decodedEvent.value.toString(),
                                  block: block.header.height,
                                  timestamp: block.header.timestamp,
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
