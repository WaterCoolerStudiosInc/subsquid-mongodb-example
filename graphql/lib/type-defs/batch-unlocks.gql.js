"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BATCH_UNLOCK_TYPE_DEFS = void 0;
const { gql } = require('apollo-server-express');
exports.BATCH_UNLOCK_TYPE_DEFS = gql `
  type Query {
    getAllBatchUnlocks: [BatchUnlocks!]!
  }

  type BatchUnlocks {
    id: ID!
    shares: String!
    spot_value: String!
    batch_id: String!
  }
`;
//# sourceMappingURL=batch-unlocks.gql.js.map