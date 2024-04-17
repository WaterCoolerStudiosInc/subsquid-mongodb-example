"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeResolver = void 0;
const stakes_1 = require("../models/stakes");
exports.StakeResolver = {
    Query: {
        getAllStakes: async () => await stakes_1.StakeModel.find({})
    },
};
//# sourceMappingURL=stakes-resolver.js.map