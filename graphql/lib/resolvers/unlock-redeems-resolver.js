"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockRedeemsResolver = void 0;
const unlock_redeems_1 = require("../models/unlock-redeems");
exports.UnlockRedeemsResolver = {
    Query: {
        getAllUnlockRedeems: async () => await unlock_redeems_1.UnlockRedeemsModel.find({})
    },
};
//# sourceMappingURL=unlock-redeems-resolver.js.map