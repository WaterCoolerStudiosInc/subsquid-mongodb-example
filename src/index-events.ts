import assert from 'assert'
import * as vault from './abi/vault.js'
import { DataHandlerContext } from '@subsquid/substrate-processor'
import { Collection, Db } from 'mongodb'
import { VAULT_CONTRACT_ADDRESS } from './processor.js'

export async function startIndexingVault(
    ctx: DataHandlerContext<Db, {
    block: {
        timestamp: true;
    };
    extrinsic: {
        hash: true;
    };
  }>): Promise<void> {
    const analyticsCollection: Collection<Document> = ctx.store.collection('analytics');

    for (const block of ctx.blocks) {
      assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
      for (const event of block.events) {
          if (event.name === 'Contracts.ContractEmitted' && event.args.contract === VAULT_CONTRACT_ADDRESS) {
              assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
              const decodedEvent = vault.decodeEvent(event.args.data)

              switch (decodedEvent.__kind) {
                case 'BatchUnlockSent' : {
                    const collection = ctx.store.collection('batch_unlocks')
                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    shares: decodedEvent.shares.toString(),
                                    spot_value: decodedEvent.spotValue.toString(),
                                    batch_id: decodedEvent.batchId.toString(),
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                            }, 
                            { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }
                    break
                }

                case 'Staked': {
                    const collection = ctx.store.collection('stakes')
                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                  $set: {
                                      event_id: event.id,
                                      staker:decodedEvent.staker,
                                      azero:decodedEvent.azero.toString(),
                                      newShares:decodedEvent.newShares.toString(),  
                                      timestamp: block.header.timestamp,
                                      block: block.header.height
                                  } 
                              },
                              { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }
                    
                    break
                }

                case 'UnlockRequested': {
                    const collection = ctx.store.collection('unlock_requests')

                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    staker:decodedEvent.staker,
                                    shares:decodedEvent.shares.toString(),
                                    batch_id:decodedEvent.batchId.toString(),
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                            },
                            { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }

                    break
                }

                case 'UnlockCanceled': {
                    const collection = ctx.store.collection('unlock_cancels')

                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    staker:decodedEvent.staker,
                                    shares:decodedEvent.shares.toString(),
                                    batch_id:decodedEvent.batchId.toString(),
                                    unlock_id:decodedEvent.unlockId.toString(),
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                            },
                            { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }

                    break
                }

                case 'UnlockRedeemed': {
                    const collection = ctx.store.collection('unlock_redeems')

                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    staker:decodedEvent.staker,
                                    unlock_id:decodedEvent.unlockId.toString(),
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                              },
                              { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }

                    break
                }

                case 'Compounded': {
                    const collection = ctx.store.collection('compounds')
                    
                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    azero: decodedEvent.azero.toString(),
                                    incentive: decodedEvent.incentive.toString(),
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                              },
                              { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }
                    break
                }

                case 'FeesWithdrawn': {
                    const collection = ctx.store.collection('fees_withdrawn')

                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    shares: decodedEvent.shares.toString(),
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                              },
                              { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }
                    break
                }

                case 'FeesAdjusted': {
                    const collection = ctx.store.collection('fees_adjusted')

                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    new_fee: decodedEvent.newFee,
                                    timestamp: block.header.timestamp,
                                    block: block.header.height
                                }
                              },
                              { upsert: true }
                        )
                    } catch (error) {
                        console.error(`Failed to update collection for event ${decodedEvent.__kind} \n ${error}`)
                        throw error
                    }
                    break
                }
                default:
                    console.log(`Unhandled event type: ${decodedEvent.__kind}`);
                    break;
              }
          }
      }
    }
}