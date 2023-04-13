const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;
const expiration = `${process.env.MAX_AGE}s`;

const signToken = ({ email, name, _id }) => {
  const payload = { email, name, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
