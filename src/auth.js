const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.hashPassword = (password, hashRounds = 9) =>
  bcrypt.hash(password, hashRounds);

exports.verifyPassword = (password, hash) => bcrypt.compare(password, hash);

exports.createToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: '28d' });

exports.verifyToken = token => jwt.verify(token, JWT_SECRET);
