const { gql } = require('apollo-server-express')

export const UNLOCK_CANCELS_TYPE_DEFS = gql`
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
`