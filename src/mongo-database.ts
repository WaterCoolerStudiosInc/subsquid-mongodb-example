import { MongoClient, Db } from 'mongodb'
import { FinalDatabase } from '@subsquid/util-internal-processor-tools'
import { FinalTxInfo, HashAndHeight } from '@subsquid/typeorm-store/lib/interfaces'
import { assertNotNull } from '@subsquid/substrate-processor'
import assert from 'assert'

export class MongoDBDatabase implements FinalDatabase<Db> {
  private client: MongoClient
  private db: Db
  private state: HashAndHeight
  private startingFrom: number

  constructor(private dbUrl: string, private dbName: string, private startingHeight: number = -1) {
    this.client = new MongoClient(this.dbUrl, {
      authSource: 'admin'
    })
    this.db = this.client.db(this.dbName)

    this.startingFrom = startingHeight
    this.state = { 
      height: startingHeight,
      hash: '0x'
    }
  }

  async connect(): Promise<HashAndHeight> {
    this.client = new MongoClient(this.dbUrl)
    await this.client.connect()
    this.db = this.client.db(this.dbName)
    console.log('Connected to MongoDB')

    this.state = await this.getState()

    console.log(`Current state: ${JSON.stringify(this.state)}`)
    return this.state
  }

  async transact(info: FinalTxInfo, cb: (store: Db) => Promise<void>): Promise<void> {
    const session = this.client.startSession()
    let dbState = await this.getState()

    let prevState = assertNotNull(this.state, 'not connected')
    let {nextHead: newState} = info

    assert(
        dbState.hash === prevState.hash && dbState.height === prevState.height,
        'state was updated by foreign process, make sure no other processor is running'
    )
    assert(prevState.height < newState.height)
    assert(prevState.hash != newState.hash)

    try {
      session.startTransaction()
      await cb(this.db)
      await session.commitTransaction()

      await this.advance(newState)
      this.state = newState
  
    } catch (error) {
      console.error('Transaction error:', error)
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }

  // Get the current state of the indexer, if it doesn't exist, create it
  async getState(): Promise<HashAndHeight> {
    try {
      const statesCollection = this.db.collection('states')
      let state = await statesCollection.findOne({}) as any

      if (state == null) {
        state = { height: this.startingFrom, hash: '0x' }
        await this.advance(state)
        return state
      }

      return state.info
    } catch (error) {
      console.error("Failed to get state:", error)
      throw error
    }
  }

  // Update the state of the indexer
  async advance(info: HashAndHeight): Promise<void> {
    try {
      const statesCollection = this.db.collection('states')
  
      const updateResult = await statesCollection.updateOne(
        {},
        { $set: { info} },
        { upsert: true } 
      )
  
      if (updateResult.matchedCount === 0) {
        console.log("No matching document found, a new one was created.")
      } else {
        console.log("State document updated successfully.")
      }
    } catch (error) {
      console.error("Failed to advance state:", error)
      throw error
    }
  }
}