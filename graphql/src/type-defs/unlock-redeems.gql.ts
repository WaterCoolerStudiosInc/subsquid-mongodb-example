const { gql } = require('apollo-server-express')

export const UNLOCK_REDEEMS_TYPE_DEFS = gql`
  type Query {
    getAllUnlockRedeems: [UnlockRedeems!]!
  }

  type UnlockRedeems {
    id: ID!
    staker: String!
    unlock_id: String!
  }
`