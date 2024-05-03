import 'dotenv/config';
import {
    processor,
} from './processor'
import { MongoDBDatabase } from './mongo-database'
import { startIndexingVault } from './index-events'

const localConnectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

//TODO would be nice to read the starting block in automagically
const mongoDB = new MongoDBDatabase(process.env.DB_URL || localConnectionString,
                                    process.env.DB_NAME || 'aleph-indexer', 
                                    Number(process.env.STARTING_BLOCK) || 1)
    
processor.run(mongoDB, async ctx => {
    console.log("PROCESSING LOOP")
    await startIndexingVault(ctx)
})