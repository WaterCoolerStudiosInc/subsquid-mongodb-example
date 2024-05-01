import 'dotenv/config';
import {
    processor,
} from './processor'
import { MongoDBDatabase } from './mongo-database'
import { startIndexingVault } from './index-events'

const localConnectionString = 'mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin'

//TODO would be nice to read the starting block in automagically
const mongoDB = new MongoDBDatabase(process.env.DB_URL || localConnectionString, 'aleph-indexer', Number(process.env.STARTING_BLOCK) || 1)
    
processor.run(mongoDB, async ctx => {
    console.log("PROCESSING LOOP")
    await startIndexingVault(ctx)
})