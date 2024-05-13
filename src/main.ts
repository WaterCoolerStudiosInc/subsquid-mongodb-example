import 'dotenv/config';
import {
    startProcessor,
} from './processor.js'
import { MongoDBDatabase } from './mongo-database.js'
import { getContracts } from './utils/get-contracts.js';
import { assertNotNull } from '@subsquid/substrate-processor';

async function main() {
    const contracts = await getContracts()

    const localConnectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    const vaultContract =  assertNotNull(contracts.find(n => n.name == 'vault'), `Contract - vault couldnt be loaded from npm`)

    const mongoDB = new MongoDBDatabase(process.env.DB_URL || localConnectionString,
                                        process.env.DB_NAME || 'aleph-indexer', 
                                        vaultContract?.blockNumber || 1)
    await startProcessor(vaultContract, mongoDB)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
