"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const StakeSchema = new mongoose_1.default.Schema({
    id: { type: String },
    staker: { type: String },
    azero: { type: String },
    newShares: { type: String }
});
exports.StakeModel = mongoose_1.default.model('stakes', StakeSchema);
//# sourceMappingURL=stakes.js.map