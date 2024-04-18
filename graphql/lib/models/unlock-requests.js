"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockRequestModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UnlockRequestSchema = new mongoose_1.default.Schema({
    id: { type: String },
    staker: { type: String },
    shares: { type: String },
    batch_id: { type: Number },
});
exports.UnlockRequestModel = mongoose_1.default.model('unlock_requests', UnlockRequestSchema);
//# sourceMappingURL=unlock-requests.js.map