"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNLOCK_REQ_TYPE_DEFS = void 0;
const { gql } = require('apollo-server-express');
exports.UNLOCK_REQ_TYPE_DEFS = gql `
  type Query {
    getAllUnlockRequests: [UnlockRequests!]!
  }

  type UnlockRequests {
    id: ID!
    staker: String!
    shares: String!
    batch_id: String!
  }
`;
//# sourceMappingURL=unlock-requests.gql.js.map