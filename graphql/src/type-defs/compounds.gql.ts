const { gql } = require('apollo-server-express')

export const COMPOUND_TYPE_DEFS = gql`
  type Query {
    getAllCompounds: [Compounds!]!
  }

  type Compounds {
    id: ID!
    event_id: String!
    azero: String!
    incentive: String!
    timestamp: String!
    block: Int!
  }
`