const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;
const expiration = `${process.env.MAX_AGE}s`;

const signToken = ({ _id, name, email, avatar }) => {
  const payload = { _id, name, email, avatar };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { signToken };
