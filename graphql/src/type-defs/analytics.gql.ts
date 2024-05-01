const { gql } = require('apollo-server-express')

export const ANALYTICS_TYPE_DEFS = gql`
  type Query {
    getAllAnalytics: [Analytics!]!
  }

  type Analytics {
    id: ID!
    total_shares: String!
    minted_shares: String!
    virtual_shares: String!
    total_pooled: String!
    timestamp: String!
    block: Int!
  }
`