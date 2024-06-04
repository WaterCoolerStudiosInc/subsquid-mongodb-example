const { gql } = require('apollo-server-express')

export const STATE_TYPE_DEFS = gql`
  type Query {
    getIndexerState: [States!]!
  }

  type States {
    id: ID!
    hash: String!
    height: Int!
  }
`