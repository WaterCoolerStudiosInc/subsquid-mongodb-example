const { gql } = require('apollo-server-express')

export const UNLOCK_REQ_TYPE_DEFS = gql`
  type Query {
    getAllUnlockRequests: [UnlockRequests!]!
  }

  type UnlockRequests {
    id: ID!
    event_id: String!
    staker: String!
    shares: String!
    batch_id: String!
    timestamp: String!
    block: Int!
  }
`
