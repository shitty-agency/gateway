const DynamoDB = require('aws-sdk/clients/dynamodb');
const { DataMapper } = require('@aws/dynamodb-data-mapper');
const User = require('./models/user');

const {
  hashPassword,
  createToken,
  verifyToken,
  verifyPassword,
} = require('./auth');

const mapper = new DataMapper({
  client: new DynamoDB({ region: 'us-west-2' }),
});

const getUser = async query => {
  const params = Object.assign(new User(), query);

  const user = await mapper.get(params);
  if (!user.id) throw new Error('user not found');

  return user;
};

const signIn = async ({ email, password }) => {
  const user = await getUser({ email });
  if (!user.id) throw new Error('invalid email or password');

  const correctPassword = await verifyPassword(password, user.password);
  if (!correctPassword) throw new Error('invalid email or password');

  const token = createToken(email);

  return { token, ...user };
};

const signOut = () => ({ id: 'none' });

const checkToken = async ({ token }) => {
  const verifiedUser = await verifyToken(token);
  const { id } = verifiedUser;

  if (!id) throw new Error('invalid token');

  return getUser({ id });
};

const createUser = async ({ email, password }) => {
  const takenUser = await getUser({ email });
  if (takenUser.id) throw new Error('email already in use');

  const hashedPassword = await hashPassword(password);

  const params = Object.assign(new User(), { email, password: hashedPassword });
  const user = await mapper.put(params);

  const token = createToken(email);

  return { token, ...user };
};

// TODO: only allow authed users to delete users
const deleteUser = async idQuery => {
  const user = await getUser(idQuery);

  if (!user) throw new Error('user not found');

  const params = Object.assign(new User(), idQuery);
  return mapper.delete(params);
};

module.exports = {
  checkToken,
  createUser,
  deleteUser,
  getUser,
  signOut,
  signIn,
};
