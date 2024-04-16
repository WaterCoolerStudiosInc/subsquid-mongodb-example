const { gql } = require('apollo-server-express');

// export const TYPE_DEFS = gql`

// type Query {
//   getAllTransfers: [Transfer!]!
// }

// type Transfer @entity {
//   id: ID!
//   from: Owner
//   to: Owner
//   amount: BigInt!
//   timestamp: DateTime!
//   block: Int!
//   extrinsicHash: String!
// }

// type Query {
//   getAllStaked: [Staked!]!
// }

// type Staked @entity {
//   id: ID!
//   staker: String!
//   shares: String!
//   newShares: String!
// }
// type UnlockRequested @entity {
//   id: ID!
//   staker: Owner
//   shares: BigInt!
//   batchid: Int!
// }
// type BatchUnlockSent @entity {
//   id: ID!
//   staker: Owner
//   shares: BigInt!
//   spotvalue: BigInt!
//   batchid: Int!
// }

// type Cancellation @entity {
//   id: ID!
//   staker: Owner
//   shares: BigInt!
//   batchid: Int!
//   unlockid: Int!
// }

// type Redemption @entity {
//   id: ID!
//   staker: Owner
//   azero: BigInt!
//   batchid: Int
//   unlockid: Int
// }

// `;
export const TYPE_DEFS = gql`
type Query {
  getAllStakes: [Staked!]!
}

type Staked {
  id: ID!
  staker: String!
  azero: String!
  newShares: String!
}
`;