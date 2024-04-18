"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TransfersSchema = new mongoose_1.default.Schema({
    id: { type: String },
    from: { type: String },
    to: { type: String },
    amount: { type: String },
    timestamp: { type: String },
    block: { type: Number },
    extrinsicHash: { type: String }
});
exports.TransfersModel = mongoose_1.default.model('transfers', TransfersSchema);
//# sourceMappingURL=transfers.js.map