const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    available: Int!
    targetIDs: [String]!
    token: String
  }

  type Query {
    checkToken(token: String!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    signIn(email: String!, password: String!): User
    deleteUser: User
    signOut: User
  }
`);

module.exports = schema;
