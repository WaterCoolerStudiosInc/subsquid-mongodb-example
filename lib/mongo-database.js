"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBDatabase = void 0;
const mongodb_1 = require("mongodb");
const substrate_processor_1 = require("@subsquid/substrate-processor");
const assert_1 = __importDefault(require("assert"));
require('dotenv/config');
class MongoDBDatabase {
    constructor(dbUrl, dbName, startingHeight = -1) {
        this.dbUrl = dbUrl;
        this.dbName = dbName;
        this.startingHeight = startingHeight;
        this.client = new mongodb_1.MongoClient(this.dbUrl);
        this.db = this.client.db(this.dbName);
        this.startingFrom = startingHeight;
        this.state = {
            height: startingHeight,
            hash: '0x'
        };
    }
    async connect() {
        this.client = new mongodb_1.MongoClient(this.dbUrl);
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        console.log('Connected to MongoDB');
        this.state = await this.getState();
        console.log(`Current state: ${JSON.stringify(this.state)}`);
        return this.state;
    }
    async transact(info, cb) {
        const session = this.client.startSession();
        let dbState = await this.getState();
        let prevState = (0, substrate_processor_1.assertNotNull)(this.state, 'not connected');
        let { nextHead: newState } = info;
        (0, assert_1.default)(dbState.hash === prevState.hash && dbState.height === prevState.height, 'state was updated by foreign process, make sure no other processor is running');
        (0, assert_1.default)(prevState.height < newState.height);
        (0, assert_1.default)(prevState.hash != newState.hash);
        try {
            session.startTransaction();
            await cb(this.db);
            await session.commitTransaction();
            await this.advance(newState);
            this.state = newState;
        }
        catch (error) {
            console.error('Transaction error:', error);
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    // Get the current state of the indexer, if it doesn't exist, create it
    async getState() {
        try {
            const statesCollection = this.db.collection('states');
            let state = await statesCollection.findOne({});
            if (state == null) {
                state = { height: this.startingFrom, hash: '0x' };
                await this.advance(state);
                return state;
            }
            return state.info;
        }
        catch (error) {
            console.error("Failed to get state:", error);
            throw error;
        }
    }
    // Update the state of the indexer
    async advance(info) {
        try {
            const statesCollection = this.db.collection('states');
            const updateResult = await statesCollection.updateOne({}, { $set: { info } }, { upsert: true });
            if (updateResult.matchedCount === 0) {
                console.log("No matching document found, a new one was created.");
            }
            else {
                console.log("State document updated successfully.");
            }
        }
        catch (error) {
            console.error("Failed to advance state:", error);
            throw error;
        }
    }
}
exports.MongoDBDatabase = MongoDBDatabase;
//# sourceMappingURL=mongo-database.js.map