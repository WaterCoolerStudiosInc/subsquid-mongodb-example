"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const ss58 = __importStar(require("@subsquid/ss58"));
const erc20 = __importStar(require("./abi/erc20"));
const vault = __importStar(require("./abi/vault"));
const processor_1 = require("./processor");
const mongo_database_1 = require("./mongo-database");
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
const localConnectionString = 'mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin';
const mongoDB = new mongo_database_1.MongoDBDatabase(process.env.DB_URL || localConnectionString, 'aleph-indexer', 58879836);
processor_1.processor.run(mongoDB, async (ctx) => {
    console.log("PROCESSING LOOP");
    await getUnlockRecords(ctx);
    await getBatchUnlockRecords(ctx);
    await getCancellationRecords(ctx);
    await getRedemptionRecord(ctx);
    await getStakeRecords(ctx);
    // await getTransferRecords(ctx)
});
async function getBatchUnlockRecords(ctx) {
    console.log('GETTING BATCH UNLOCK RECORDS');
    const collection = ctx.store.collection('batch_unlocks');
    const bulkOps = [];
    for (const block of ctx.blocks) {
        (0, assert_1.default)(block.header.timestamp, `Block ${block.header.height} had no timestamp`);
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === processor_1.CONTRACT_ADDRESS) {
                (0, assert_1.default)(event.extrinsic, `Event ${event} arrived without a parent extrinsic`);
                const decodedEvent = vault.decodeEvent(event.args.data);
                if (decodedEvent.__kind === 'BatchUnlockSent') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: {
                                $set: {
                                    id: event.id,
                                    staker: decodedEvent.staker,
                                    shares: decodedEvent.shares.toString(),
                                    spot_value: decodedEvent.spotValue.toString(),
                                    batch_id: decodedEvent.batchId.toString(),
                                }
                            },
                            upsert: true
                        }
                    });
                }
            }
        }
    }
    if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
    }
}
async function getStakeRecords(ctx) {
    console.log('GETTING STAKE RECORDS');
    const collection = ctx.store.collection('stakes');
    const bulkOps = [];
    for (const block of ctx.blocks) {
        console.log(block.header.timestamp);
        (0, assert_1.default)(block.header.timestamp, `Block ${block.header.height} had no timestamp`);
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === processor_1.CONTRACT_ADDRESS) {
                (0, assert_1.default)(event.extrinsic, `Event ${event} arrived without a parent extrinsic`);
                const decodedEvent = vault.decodeEvent(event.args.data);
                if (decodedEvent.__kind === 'Staked') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: {
                                $set: {
                                    id: event.id,
                                    staker: decodedEvent.staker,
                                    azero: decodedEvent.azero.toString(),
                                    newShares: decodedEvent.newShares.toString(),
                                }
                            },
                            upsert: true
                        }
                    });
                }
            }
        }
    }
    if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
    }
}
async function getUnlockRecords(ctx) {
    console.log('GETTING UNLOCK RECORDS');
    const collection = ctx.store.collection('unlock_requests');
    const bulkOps = [];
    for (const block of ctx.blocks) {
        (0, assert_1.default)(block.header.timestamp, `Block ${block.header.height} had no timestamp`);
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === processor_1.CONTRACT_ADDRESS) {
                (0, assert_1.default)(event.extrinsic, `Event ${event} arrived without a parent extrinsic`);
                const decodedEvent = vault.decodeEvent(event.args.data);
                if (decodedEvent.__kind === 'UnlockRequested') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: {
                                $set: {
                                    id: event.id,
                                    staker: decodedEvent.staker,
                                    shares: decodedEvent.shares.toString(),
                                    batch_id: decodedEvent.batchId.toString(),
                                }
                            },
                            upsert: true
                        }
                    });
                }
            }
        }
    }
    if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
    }
}
async function getCancellationRecords(ctx) {
    console.log('GETTING CANCELLATION RECORDS');
    const collection = ctx.store.collection('unlock_cancels');
    const bulkOps = [];
    for (const block of ctx.blocks) {
        (0, assert_1.default)(block.header.timestamp, `Block ${block.header.height} had no timestamp`);
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === processor_1.CONTRACT_ADDRESS) {
                (0, assert_1.default)(event.extrinsic, `Event ${event} arrived without a parent extrinsic`);
                const decodedEvent = vault.decodeEvent(event.args.data);
                if (decodedEvent.__kind === 'UnlockCanceled') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: {
                                $set: {
                                    id: event.id,
                                    staker: decodedEvent.staker,
                                    shares: decodedEvent.shares.toString(),
                                    batch_id: decodedEvent.batchId.toString(),
                                    unlock_id: decodedEvent.unlockId.toString()
                                }
                            },
                            upsert: true
                        }
                    });
                }
            }
        }
    }
    if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
    }
}
async function getRedemptionRecord(ctx) {
    console.log('GETTING REDEMPTION RECORDS');
    const collection = ctx.store.collection('unlock_redeems');
    const bulkOps = [];
    for (const block of ctx.blocks) {
        (0, assert_1.default)(block.header.timestamp, `Block ${block.header.height} had no timestamp`);
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === processor_1.CONTRACT_ADDRESS) {
                (0, assert_1.default)(event.extrinsic, `Event ${event} arrived without a parent extrinsic`);
                const decodedEvent = vault.decodeEvent(event.args.data);
                if (decodedEvent.__kind === 'UnlockRedeemed') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: {
                                $set: {
                                    id: event.id,
                                    staker: decodedEvent.staker,
                                    unlock_id: decodedEvent.unlockId.toString()
                                }
                            },
                            upsert: true
                        }
                    });
                }
            }
        }
    }
    if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
    }
}
async function getTransferRecords(ctx) {
    const collection = ctx.store.collection('transfers');
    const bulkOps = [];
    for (const block of ctx.blocks) {
        (0, assert_1.default)(block.header.timestamp, `Block ${block.header.height} had no timestamp`);
        for (const event of block.events) {
            if (event.name === 'Contracts.ContractEmitted' && event.args.contract === processor_1.CONTRACT_ADDRESS) {
                (0, assert_1.default)(event.extrinsic, `Event ${event} arrived without a parent extrinsic`);
                const decodedEvent = erc20.decodeEvent(event.args.data);
                if (decodedEvent.__kind === 'Transfer') {
                    bulkOps.push({
                        updateOne: {
                            filter: { id: event.id },
                            update: {
                                $set: {
                                    id: event.id,
                                    from: decodedEvent.from && ss58.codec(processor_1.SS58_NETWORK).encode(decodedEvent.from),
                                    to: decodedEvent.to && ss58.codec(processor_1.SS58_NETWORK).encode(decodedEvent.to),
                                    amount: decodedEvent.value.toString(),
                                    block: block.header.height,
                                    timestamp: new Date(block.header.timestamp),
                                    extrinsicHash: event.extrinsic.hash
                                }
                            },
                            upsert: true
                        }
                    });
                }
            }
        }
    }
    if (bulkOps.length > 0) {
        await collection.bulkWrite(bulkOps);
    }
}
//# sourceMappingURL=main.js.map