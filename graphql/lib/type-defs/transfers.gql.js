"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSFERS_TYPE_DEFS = void 0;
const { gql } = require('apollo-server-express');
exports.TRANSFERS_TYPE_DEFS = gql `
  type Query {
    getAllTransfers: [Transfers!]!
  }

  type Transfers {
    id: ID!
    from: String!
    to: String!
    amount: String!
    timestamp: String!
    block: Int!
    extrinsicHash: String!
  }
`;
//# sourceMappingURL=transfers.gql.js.map