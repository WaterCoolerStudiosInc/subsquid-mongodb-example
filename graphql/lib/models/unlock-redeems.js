"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockRedeemsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UnlockRedeemsSchema = new mongoose_1.default.Schema({
    id: { type: String },
    staker: { type: String },
    unlock_id: { type: String }
});
exports.UnlockRedeemsModel = mongoose_1.default.model('unlock_redeems', UnlockRedeemsSchema);
//# sourceMappingURL=unlock-redeems.js.map