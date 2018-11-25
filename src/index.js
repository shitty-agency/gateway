/*
 * index.js
 * API handler
 */
const ApiBuilder = require('claudia-api-builder');
const { graphql } = require('graphql');

const schema = require('./schema');
const {
  createUser,
  deleteUser,
  checkToken,
  signOut,
  signIn,
} = require('./users');

const root = { createUser, deleteUser, signIn, signOut, checkToken };

const api = new ApiBuilder();

api.corsMaxAge(3600);
api.corsOrigin(req => {
  const {
    headers: { origin = '' },
  } = req;
  console.log('reqheaders', req.headers, origin);

  const website = /https:\/\/onchange.fyi/gi.test(origin);

  // ENABLE LOCAL DEVELOPMENT:
  // const local = /localhost:1234/gi.test(origin);
  // if (local || website) return origin;

  if (website) return origin;

  return '';
});

api.post('/graphql', async request => {
  const { body } = request;

  if (typeof body !== 'string') {
    return graphql(schema, body.query, root, {}, body.variables);
  }

  // users is root for now, all the named methods are used in queries/mutations
  // in the future, users will need to be extended with other models
  return graphql(schema, body, root);
});

module.exports = api;
