import assert from 'assert'
import * as vault from './abi/vault'
import {
  VAULT_CONTRACT_ADDRESS,
} from './processor'
import { DataHandlerContext } from '@subsquid/substrate-processor'
import { Collection, Db } from 'mongodb'
import { Analytics, AnalyticsChange, ArithmeticType } from './models/analytics'
import { addStrings, subtractStrings } from './utils/big-number-utils'

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

                    /* 
                        update virtual shares with virtual_shares
                        subtract spot_value from total_pooled 
                        subtract shares from minted shares 
                    */
                    await updateAnalytics(analyticsCollection, {
                        changeInMintedShares: decodedEvent.shares.toString(),
                        virtualShares: decodedEvent.virtualShares.toString(),
                        changeInTotalPooled: decodedEvent.spotValue.toString(),
                        timestamp: block.header.timestamp,
                        block: block.header.height,
                        arithmeticType: ArithmeticType.Sub 
                    } as AnalyticsChange)
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
                    
                    /* 
                        add to total pooled with azero passed in
                        add to minted shares with new_shares
                        update virtual shares
                    */
                        await updateAnalytics(analyticsCollection, {
                            changeInMintedShares: decodedEvent.newShares.toString(),
                            virtualShares: decodedEvent.virtualShares.toString(),
                            changeInTotalPooled: decodedEvent.azero.toString(),
                            timestamp: block.header.timestamp,
                            block: block.header.height,
                            arithmeticType: ArithmeticType.Add 
                        } as AnalyticsChange)
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

                case 'Restaked': {
                    const collection = ctx.store.collection('restakes')
                    
                    try {
                        await collection.updateOne(
                            { event_id: event.id },
                            { 
                                $set: {
                                    event_id: event.id,
                                    azero: decodedEvent.azero,
                                    incentive: decodedEvent.incentive,
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

                    /* 
                        update virtual shares with virtual_shares
                        add restaked to total_pooled
                    */
                    await updateAnalytics(analyticsCollection, {
                        changeInMintedShares: '0',
                        virtualShares: decodedEvent.virtualShares.toString(),
                        changeInTotalPooled: decodedEvent.azero.toString(),
                        timestamp: block.header.timestamp,
                        block: block.header.height,
                        arithmeticType: ArithmeticType.Add 
                    } as AnalyticsChange)
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
                                    shares: decodedEvent.shares,
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

                    /* 
                        update virtual shares to 0
                    */
                    await updateAnalytics(analyticsCollection, {
                        changeInMintedShares: '0',
                        virtualShares: '0',
                        changeInTotalPooled: '0',
                        timestamp: block.header.timestamp,
                        block: block.header.height,
                        arithmeticType: ArithmeticType.Add 
                    } as AnalyticsChange)
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

                    /* 
                        update virtual shares
                    */
                        await updateAnalytics(analyticsCollection, {
                            changeInMintedShares: '0',
                            virtualShares: decodedEvent.virtualShares.toString(),
                            changeInTotalPooled: '0',
                            timestamp: block.header.timestamp,
                            block: block.header.height,
                            arithmeticType: ArithmeticType.Add 
                        } as AnalyticsChange)
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

/*
    Helper for keeping track of analytics at a given time.
    Adds and subtracts given data, based off the passed in data
    note: virtual shares will always be overwritten by the passed in data as we are reading this directly from events
*/
async function updateAnalytics(collection: Collection<Document>, newAnalytics: AnalyticsChange) {
    // previous analytics, that we will use as a basis for adding/subtracting shares and pooled
    let analytics: Analytics = {
        totalShares: '0',
        totalPooled: '0',
        mintedShares: '0',
        virtualShares: newAnalytics.virtualShares,
        timestamp: newAnalytics.timestamp,
        block: newAnalytics.block
    }

    // First check if a document for this block already exists
    let document = await collection.findOne({ block: newAnalytics.block }) as any

    if (document) { 
        analytics = {
            totalShares: document.total_shares,
            totalPooled: document.total_pooled,
            mintedShares: document.minted_shares,
            virtualShares: newAnalytics.virtualShares,
            timestamp: newAnalytics.timestamp,
            block: newAnalytics.block
        }
        console.log(`Document for block ${newAnalytics.block} exists`)

    } else {
        // Find the document with the closest lower block number, and create a copy for the new block else, create a new empty doc
        const prevDocument = await collection.findOne({ block: { $lt: newAnalytics.block } }, { sort: { block: -1 } }) as any
        if (prevDocument) {
            analytics = {
                totalShares: prevDocument.total_shares,
                totalPooled: prevDocument.total_pooled,
                mintedShares: prevDocument.minted_shares,
                virtualShares: newAnalytics.virtualShares,
                timestamp: newAnalytics.timestamp,
                block: newAnalytics.block
            }
            console.log(`Document for block ${newAnalytics.block} doesnt exist but grabbing previous block doc ${prevDocument.block}`)
        }
    }

    const toUpdate = newAnalytics.arithmeticType === ArithmeticType.Add ? 
        addAnalyticsValues(analytics, newAnalytics) : 
        subAnalyticsValues(analytics, newAnalytics)

        try {
            await collection.updateOne(
                { block: toUpdate.block },
                { 
                    $set: {
                        total_shares: toUpdate.totalShares,
                        minted_shares: toUpdate.mintedShares,
                        virtual_shares: toUpdate.virtualShares,
                        total_pooled: toUpdate.totalPooled,
                        timestamp: toUpdate.timestamp,
                        block: toUpdate.block
                    }
                }, 
                { upsert: true }
            )
        } catch (error) {
            console.error("Failed to update analytics:", error)
            throw error
        }
}

// Adds two analytics objects together
// Virtual shares, timestamp and block should always be set to the newest value
function addAnalyticsValues(oldAnalytics: Analytics, analyticsChange: AnalyticsChange) : Analytics {
    const totalMintedShares = addStrings(oldAnalytics.mintedShares, analyticsChange.changeInMintedShares)
    console.log(`Adding analytics, \n Previous value: \n ${JSON.stringify(oldAnalytics)} \n Change: \n ${JSON.stringify(analyticsChange)}`)

    return {
        totalShares: addStrings(totalMintedShares, analyticsChange.virtualShares),
        totalPooled: addStrings(oldAnalytics.totalPooled, analyticsChange.changeInTotalPooled),
        mintedShares: totalMintedShares,
        virtualShares: analyticsChange.virtualShares,
        timestamp: analyticsChange.timestamp,
        block: analyticsChange.block
    } as Analytics
}

// Subtracts two analytics objects together
// Virtual shares, timestamp and block should always be set to the newest value
function subAnalyticsValues(oldAnalytics: Analytics, analyticsChange: AnalyticsChange) :  Analytics {
    const totalMintedShares = subtractStrings(oldAnalytics.mintedShares, analyticsChange.changeInMintedShares)
    console.log(`Subtracting analytics, \n Previous value: \n ${JSON.stringify(oldAnalytics)} \n Change: \n ${JSON.stringify(analyticsChange)}`)

    return {
        totalShares: addStrings(totalMintedShares, analyticsChange.virtualShares),
        totalPooled: subtractStrings(oldAnalytics.totalPooled, analyticsChange.changeInTotalPooled),
        mintedShares: totalMintedShares,
        virtualShares: analyticsChange.virtualShares,
        timestamp: analyticsChange.timestamp,
        block: analyticsChange.block
    } as Analytics
}

// export async function getTransferRecords(
//   ctx: DataHandlerContext<Db, {
//     block: {
//         timestamp: true;
//     };
//     extrinsic: {
//         hash: true;
//     };
//   }>): Promise<void> {
//   const collection = ctx.store.collection('transfers')
//   const bulkOps = []
//   for (const block of ctx.blocks) {
//       assert(block.header.timestamp, `Block ${block.header.height} had no timestamp`)
//       for (const event of block.events) {
//           if (event.name === 'Contracts.ContractEmitted' && event.args.contract === VAULT_CONTRACT_ADDRESS) {
//               assert(event.extrinsic, `Event ${event} arrived without a parent extrinsic`)
//               const decodedEvent = erc20.decodeEvent(event.args.data)
//               if (decodedEvent.__kind === 'Transfer') {
//                   bulkOps.push({
//                       updateOne: {
//                           filter: { id: event.id },
//                           update: { 
//                               $set: {
//                                   id: event.id,
//                                   from: decodedEvent.from && ss58.codec(SS58_NETWORK).encode(decodedEvent.from),
//                                   to: decodedEvent.to && ss58.codec(SS58_NETWORK).encode(decodedEvent.to),
//                                   amount: decodedEvent.value.toString(),
//                                   block: block.header.height,
//                                   timestamp: block.header.timestamp,
//                                   extrinsicHash: event.extrinsic.hash
//                               }
//                           },
//                           upsert: true
//                       }
//                   })
//               }
//           }
//       }
//   }
//   if(bulkOps.length > 0){
//       await collection.bulkWrite(bulkOps)
//   }
// }
