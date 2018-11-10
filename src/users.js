const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const { DataMapper } = require('@aws/dynamodb-data-mapper');
const User = require('./models/user');

const { hashPassword, createToken } = require('./auth');

const mapper = new DataMapper({
  client: new DynamoDB({ region: 'us-west-2' }),
});

const filterPassword = ({ password, ...rest }) => rest;

const getUser = function(id) {
  return filterPassword(mapper.get(new User({ id })));
};

const createUser = async ({ email, password }) => {
  const id = uuid.v4();
  const hashedPassword = hashPassword(password);

  const user = await mapper.put(new User({ id, password: hashedPassword }));

  const token = createToken(email);

  return { id, token, ...filterPassword(user) };
};

const deleteUser = async id => {
  const user = await getUser(id);

  if (!user) throw new Error('user not found');

  return mapper.delete(new User({ id }));
};

module.exports = { createUser, getUser, deleteUser };
