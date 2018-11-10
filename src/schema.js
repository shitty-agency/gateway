/*
 * schema.js
 * GraphQL schema definition
 */
const { buildSchema } = require('graphql');

// _token should
const schema = buildSchema`
  type User {
    id: ID!
    email: String!
    password: String!
    available: Number!
    targetIDs: [String]!
    token: String
  }

  type Query {
    getUser(id): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    deleteUser(id: ID!): User
  }
`;

export default schema;
