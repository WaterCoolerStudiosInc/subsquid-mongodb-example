"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchUnlocksResolver = void 0;
const batch_unlocks_1 = require("../models/batch-unlocks");
exports.BatchUnlocksResolver = {
    Query: {
        getAllBatchUnlocks: async () => await batch_unlocks_1.BatchUnlocksModel.find({})
    },
};
//# sourceMappingURL=batch-unlocks-resolver.js.map