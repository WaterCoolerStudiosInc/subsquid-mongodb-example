"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockRequestResolver = void 0;
const unlock_requests_1 = require("../models/unlock-requests");
exports.UnlockRequestResolver = {
    Query: {
        getAllUnlockRequests: async () => await unlock_requests_1.UnlockRequestModel.find({})
    },
};
//# sourceMappingURL=unlock-requests-resolver.js.map