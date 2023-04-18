const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;
const expiration = `${process.env.MAX_AGE}s`;

// Updated signToken to get more fields to be used on the FE
const signToken = ({ _id, name, email, avatar, location }) => {
  const payload = { _id, name, email, avatar, location };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
