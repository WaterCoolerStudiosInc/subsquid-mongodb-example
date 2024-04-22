import assert from 'assert'
import * as ss58 from '@subsquid/ss58'

import * as erc20 from './abi/erc20'
import * as vault from './abi/vault'
import {
  SS58_NETWORK,
  VAULT_CONTRACT_ADDRESS,
} from './processor'
import { DataHandlerContext } from '@subsquid/substrate-processor'
import { Db } from 'mongodb'

/*
TODO
- Start tracking total shares and total pooled
- Create user object and start tracking their 
*/

export async function startIndexingVault(
    ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
  for (const block of ctx.blocks) {
      assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
      for (const event of block.events) {
          if (event.name === 'Contracts.ContractEmitted' && event.args.contract === VAULT_CONTRACT_ADDRESS) {
              assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
              const decodedEvent = vault.decodeEvent(event.args.data)

              switch (decodedEvent.__kind) {
                case 'BatchUnlockSent' : {
                    const collection = ctx.store.collection('batch_unlocks')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                shares: decodedEvent.shares.toString(),
                                spot_value: decodedEvent.spotValue.toString(),
                                batch_id: decodedEvent.batchId.toString(),
                            }
                        }, 
                        { upsert: true }
                    )
                    break
                }

                case 'Staked': {
                    const collection = ctx.store.collection('stakes')
                    collection.updateOne(
                        { id: event.id },
                        { 
                              $set: {
                                  id: event.id,
                                  staker:decodedEvent.staker,
                                  azero:decodedEvent.azero.toString(),
                                  newShares:decodedEvent.newShares.toString(),  
                              } 
                          },
                          { upsert: true }
                    )
                    break
                }

                case 'UnlockRequested': {
                    const collection = ctx.store.collection('unlock_requests')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                staker:decodedEvent.staker,
                                shares:decodedEvent.shares.toString(),
                                batch_id:decodedEvent.batchId.toString(),
                            }
                        },
                        { upsert: true }
                    )
                    break
                }

                case 'UnlockCanceled': {
                    const collection = ctx.store.collection('unlock_cancels')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                staker:decodedEvent.staker,
                                shares:decodedEvent.shares.toString(),
                                batch_id:decodedEvent.batchId.toString(),
                                unlock_id:decodedEvent.unlockId.toString()
                            }
                        },
                        { upsert: true }
                    )
                    break
                }

                case 'UnlockRedeemed': {
                    const collection = ctx.store.collection('unlock_redeems')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                staker:decodedEvent.staker,
                                unlock_id:decodedEvent.unlockId.toString()
                            }
                          },
                          { upsert: true }
                    )
                    break
                }

                case 'Restaked': {
                    const collection = ctx.store.collection('restakes')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                caller: decodedEvent.caller,
                                azero: decodedEvent.azero,
                                incentive: decodedEvent.incentive
                            }
                          },
                          { upsert: true }
                    )
                    break
                }

                case 'FeesWithdrawn': {
                    const collection = ctx.store.collection('fees_withdrawn')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                shares: decodedEvent.shares
                            }
                          },
                          { upsert: true }
                    )
                    break
                }

                case 'FeesAdjusted': {
                    const collection = ctx.store.collection('fees_adjusted')
                    collection.updateOne(
                        { id: event.id },
                        { 
                            $set: {
                                id: event.id,
                                new_fee: decodedEvent.newFee
                            }
                          },
                          { upsert: true }
                    )
                    break
                }
              }
          }
      }
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
          if (event.name === 'Contracts.ContractEmitted' && event.args.contract === VAULT_CONTRACT_ADDRESS) {
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
