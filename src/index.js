/*
 * index.js
 * API handler
 */

const ApiBuilder = require('claudia-api-builder');
const Graphql = require('graphql');

const schema = require('./schema');
const { createUser, getUser, deleteUser } = require('./users');

const root = { createUser, getUser, deleteUser };

const api = new ApiBuilder();

api.post('/graphql', request => {
  if (typeof request.body !== 'string') {
    return 'POST body must be a string';
  }

  // users is root for now, all the named methods are used in queries/mutations
  // in the future, users will need to be extended with other models
  return Graphql.graphql(schema, request.body, root);
});

module.exports = api;
