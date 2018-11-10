/*
 * schema.js
 * GraphQL schema definition
 */
const { buildSchema } = require('graphql');

// _token should
const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
    password: String!
    available: Int!
    targetIDs: [String]!
    token: String
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    deleteUser(id: ID!): User
  }
`);

module.exports = schema;
