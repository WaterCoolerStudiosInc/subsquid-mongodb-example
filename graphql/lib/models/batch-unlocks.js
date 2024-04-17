"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchUnlocksModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BatchUnlocksSchema = new mongoose_1.default.Schema({
    id: { type: String },
    shares: { type: String },
    spot_value: { type: String },
    batch_id: { type: String }
});
exports.BatchUnlocksModel = mongoose_1.default.model('batch_unlocks', BatchUnlocksSchema);
//# sourceMappingURL=batch-unlocks.js.map