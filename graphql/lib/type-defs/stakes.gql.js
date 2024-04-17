"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAKE_TYPE_DEFS = void 0;
const { gql } = require('apollo-server-express');
exports.STAKE_TYPE_DEFS = gql `
  type Query {
    getAllStakes: [Stakes!]!
  }

  type Stakes {
    id: ID!
    staker: String!
    azero: String!
    newShares: String!
  }
`;
//# sourceMappingURL=stakes.gql.js.map