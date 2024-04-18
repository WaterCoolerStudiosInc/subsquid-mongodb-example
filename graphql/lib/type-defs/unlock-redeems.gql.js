"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNLOCK_REDEEMS_TYPE_DEFS = void 0;
const { gql } = require('apollo-server-express');
exports.UNLOCK_REDEEMS_TYPE_DEFS = gql `
  type Query {
    getAllUnlockRedeems: [UnlockRedeems!]!
  }

  type UnlockRedeems {
    id: ID!
    staker: String!
    unlock_id: String!
  }
`;
//# sourceMappingURL=unlock-redeems.gql.js.map