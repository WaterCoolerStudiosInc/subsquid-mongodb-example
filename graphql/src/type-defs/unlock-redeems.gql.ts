const { gql } = require('apollo-server-express')

export const UNLOCK_REDEEMS_TYPE_DEFS = gql`
  type Query {
    getAllUnlockRedeems: [UnlockRedeems!]!
  }

  type UnlockRedeems {
    id: ID!
    event_id: String!
    staker: String!
    unlock_id: String!
    timestamp: String!
    block: Int!
  }
`