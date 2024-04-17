"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersResolver = void 0;
const transfers_1 = require("../models/transfers");
exports.TransfersResolver = {
    Query: {
        getAllTransfers: async () => await transfers_1.TransfersModel.find({})
    },
};
//# sourceMappingURL=transfers-resolver.js.map