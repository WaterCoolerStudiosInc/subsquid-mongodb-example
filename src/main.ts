import 'dotenv/config';
import {
    processor,
} from './processor.js'
import { MongoDBDatabase } from './mongo-database.js'
import { startIndexingVault } from './index-events.js';

// export const CONTRACTS = await getContracts()
// export const vaultContract =  assertNotNull(CONTRACTS.find(n => n.name == 'vault'), `Contract - vault couldnt be loaded from npm`)
import { blockNumber } from '@water-cooler-studios/kintsu-contracts/deployments/vault/alephzero-testnet.js'

const localConnectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

const mongoDB = new MongoDBDatabase(process.env.DB_URL || localConnectionString,
                                    process.env.DB_NAME || 'aleph-indexer', 
                                    blockNumber || 1)

processor.run(mongoDB, async (ctx: any) => {
  console.log("PROCESSING LOOP")
  await startIndexingVault(ctx)
})
