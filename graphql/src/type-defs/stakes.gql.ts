const { gql } = require('apollo-server-express')

export const STAKE_TYPE_DEFS = gql`
  type Query {
    getAllStakes: [Stakes!]!
  }

  type Stakes {
    id: ID!
    staker: String!
    azero: String!
    newShares: String!
  }
`