"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlockCancelsResolver = void 0;
const unlock_cancels_1 = require("../models/unlock-cancels");
exports.UnlockCancelsResolver = {
    Query: {
        getAllUnlockCancels: async () => await unlock_cancels_1.UnlockCancelsModel.find({})
    },
};
//# sourceMappingURL=unlock-cancels-resolver.js.map