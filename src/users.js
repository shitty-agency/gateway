import uuid from 'uuid';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import User from './models/user';

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
