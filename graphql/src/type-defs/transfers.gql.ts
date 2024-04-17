const { gql } = require('apollo-server-express')

export const TRANSFERS_TYPE_DEFS = gql`
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
`