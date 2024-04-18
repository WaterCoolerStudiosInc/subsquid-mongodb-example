import {
    processor,
} from './processor'
import { MongoDBDatabase } from './mongo-database'
import { getBatchUnlockRecords, getCancellationRecords, getRedemptionRecord, getStakeRecords, getUnlockRecords } from './index-events'

const localConnectionString = 'mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin'

//TODO would be nice to read the starting block in automagically
const mongoDB = new MongoDBDatabase(process.env.DB_URL || localConnectionString, 'aleph-indexer', 58879836)
    
processor.run(mongoDB, async ctx => {
    console.log("PROCESSING LOOP")
    await getUnlockRecords(ctx)
    await getBatchUnlockRecords(ctx)
    await getCancellationRecords(ctx)
    await getRedemptionRecord(ctx)
    await getStakeRecords(ctx)
    // await getTransferRecords(ctx)
})