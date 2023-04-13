const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;
const expiration = '2h';

const signToken = ({ email, name, _id }) => {
  const payload = { email, name, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
