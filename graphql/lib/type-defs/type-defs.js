"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_DEFS = void 0;
const stakes_gql_1 = require("./stakes.gql");
const unlock_requests_gql_1 = require("./unlock-requests.gql");
const batch_unlocks_gql_1 = require("./batch-unlocks.gql");
const transfers_gql_1 = require("./transfers.gql");
const unlock_cancels_gql_1 = require("./unlock-cancels.gql");
const unlock_redeems_gql_1 = require("./unlock-redeems.gql");
//TODO would be nice to autogenerate these eventually
exports.TYPE_DEFS = [
    stakes_gql_1.STAKE_TYPE_DEFS,
    unlock_requests_gql_1.UNLOCK_REQ_TYPE_DEFS,
    batch_unlocks_gql_1.BATCH_UNLOCK_TYPE_DEFS,
    transfers_gql_1.TRANSFERS_TYPE_DEFS,
    unlock_cancels_gql_1.UNLOCK_CANCELS_TYPE_DEFS,
    unlock_redeems_gql_1.UNLOCK_REDEEMS_TYPE_DEFS
];
//# sourceMappingURL=type-defs.js.map