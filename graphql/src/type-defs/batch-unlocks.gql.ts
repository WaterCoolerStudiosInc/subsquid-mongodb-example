const { gql } = require('apollo-server-express')

export const BATCH_UNLOCK_TYPE_DEFS = gql`
  type Query {
    getAllBatchUnlocks: [BatchUnlocks!]!
  }

  type BatchUnlocks {
    id: ID!
    shares: String!
    spot_value: String!
    batch_id: String!
  }
`