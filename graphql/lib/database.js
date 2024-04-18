"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        const localConnectionString = 'mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin';
        await mongoose_1.default.connect(process.env.DB_URL || localConnectionString);
        console.log('Successfully connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map