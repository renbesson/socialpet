const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////
// Middleware for checking if token is valid
////////////////////////////////////////////////////////////////////////////////
const checkToken = (req, res, next) => {
  const { token } = req.body;

  try {
    // Verifies the token stored (if any) is valid and stores the user's
    // info in the 'req.user' variable
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    // Deletes the invalid token and redirects the user to the main page
    return res.status(401).json('Invalid token!');
  }
};

module.exports = { checkToken };
