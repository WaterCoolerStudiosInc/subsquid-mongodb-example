"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOLVERS = void 0;
const batch_unlocks_resolver_1 = require("./batch-unlocks-resolver");
const stakes_resolver_1 = require("./stakes-resolver");
const transfers_resolver_1 = require("./transfers-resolver");
const unlock_cancels_resolver_1 = require("./unlock-cancels-resolver");
const unlock_redeems_resolver_1 = require("./unlock-redeems-resolver");
const unlock_requests_resolver_1 = require("./unlock-requests-resolver");
exports.RESOLVERS = [
    batch_unlocks_resolver_1.BatchUnlocksResolver,
    stakes_resolver_1.StakeResolver,
    transfers_resolver_1.TransfersResolver,
    unlock_cancels_resolver_1.UnlockCancelsResolver,
    unlock_redeems_resolver_1.UnlockRedeemsResolver,
    unlock_requests_resolver_1.UnlockRequestResolver
];
//# sourceMappingURL=resolvers.js.map