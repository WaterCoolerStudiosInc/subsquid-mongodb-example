const { gql } = require('apollo-server-express')

export const UNLOCK_CANCELS_TYPE_DEFS = gql`
  type Query {
    getAllUnlockCancels: [UnlockCancels!]!
  }

  type UnlockCancels {
    id: ID!
    event_id: String!
    staker: String!
    shares: String!
    batch_id: String!
    unlock_id: String!
    timestamp: String!
    block: Int!
  }
`