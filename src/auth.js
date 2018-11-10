const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.hashPassword = (password, hashRounds) =>
  bcrypt.hash(password, hashRounds);

exports.verifyPassword = (password, hash) => bcrypt.compare(password, hash);

exports.createToken = email => jwt.sign({ email }, JWT_SECRET, '28d');

exports.verifyToken = (token, opts = {}) => jwt.verify(token, JWT_SECRET, opts);
