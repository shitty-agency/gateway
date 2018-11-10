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

/**
 * Get a single user by a direct field match
 * can match either by ID or by EMAIL
 *
 * @async
 * @param {Object} user - A new user
 * @param {String} user.email - A unique email
 * @param {String} user.id - A user id
 * @returns {Object} user - a previously created user
 */
const getUser = async query => {
  const params = Object.assign(new User(), query);

  let user = null;

  try {
    user = await mapper.get(params);
  } catch (e) {
    console.log('unable to find user');
  }

  return user;
};

/**
 * Lets a user sign in with their email & password
 *
 * @async
 * @param {Object} user - An existing user
 * @param {String} user.email - A unique email
 * @param {String} user.password - A user password
 * @returns {Object} user - user details with token property
 */
const signIn = async ({ email, password }) => {
  const user = await getUser({ email });
  console.log('user', user);
  if (!user) throw new Error('invalid email or password');

  const correctPassword = await verifyPassword(password, user.password);
  console.log('password', correctPassword);
  if (!correctPassword) throw new Error('invalid email or password');

  const token = createToken(user.id);

  return { token, ...user };
};

/**
 * User sign out, basically does nothing but return a fake id
 *
 * @returns {Object} user - a signed-out user object
 * @returns {String} user - id of 'none'
 */
const signOut = () => ({ id: 'none' });

const checkToken = async ({ token }) => {
  const tokenData = await verifyToken(token);
  const { id } = tokenData;

  if (!id) throw new Error('invalid token');

  return getUser({ id });
};

/**
 * Create a new user! just takes password & email
 *
 * @async
 * @param {Object} user - A new user
 * @param {String} user.email - A unique email
 * @param {String} user.password - A user password
 * @returns {Object} user - a new user with token
 */
const createUser = async ({ email, password }) => {
  const takenUser = await getUser({ email });
  if (takenUser) throw new Error('email already in use');

  const hashedPassword = await hashPassword(password);

  const params = Object.assign(new User(), { email, password: hashedPassword });
  const user = await mapper.put(params);

  const token = createToken(user.id);

  return { token, ...user };
};

// TODO: only allow authed users to delete users
/**
 * Find a user and delete them permenantly
 *
 * @async
 * @param {Object} user - A user object query
 * @param {String} user.id - A user's ID
 * @returns {Object} user - the shape of the deleted user
 */
const deleteUser = async ({ id }) => {
  const user = await getUser({ id });

  if (!user) throw new Error('user not found');

  const params = Object.assign(new User(), { id });
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
