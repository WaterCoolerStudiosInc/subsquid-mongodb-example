"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNLOCK_CANCELS_TYPE_DEFS = void 0;
const { gql } = require('apollo-server-express');
exports.UNLOCK_CANCELS_TYPE_DEFS = gql `
  type Query {
    getAllUnlockCancels: [UnlockCancels!]!
  }

  type UnlockCancels {
    id: ID!
    staker: String!
    shares: String!
    batch_id: String!
    unlock_id: String!
  }
`;
//# sourceMappingURL=unlock-cancels.gql.js.map