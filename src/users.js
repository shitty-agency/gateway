const DynamoDB = require('aws-sdk/clients/dynamodb');
const { DataMapper } = require('@aws/dynamodb-data-mapper');
const User = require('./models/user');

const { hashPassword, createToken } = require('./auth');

const mapper = new DataMapper({
  client: new DynamoDB({ region: 'us-west-2' }),
});

const filterPassword = ({ password, ...rest }) => rest;

const getUser = async ({ id }) => {
  const params = Object.assign(new User(), { id });
  const user = await mapper.get(params);
  console.log('uuuuu', user);

  if (!user.id) throw new Error('user not found');

  return filterPassword(user);
};

const createUser = async ({ email, password }) => {
  const hashedPassword = await hashPassword(password);

  const params = Object.assign(new User(), { email, password: hashedPassword });
  const user = await mapper.put(params);

  const token = createToken(email);

  return { token, ...filterPassword(user) };
};

// TODO: only allow authed users to delete users
const deleteUser = async idQuery => {
  const user = await getUser(idQuery);

  if (!user) throw new Error('user not found');

  const params = Object.assign(new User(), idQuery);
  return mapper.delete(params);
};

module.exports = { createUser, getUser, deleteUser };
