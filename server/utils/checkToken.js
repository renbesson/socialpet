const { verify } = require("jsonwebtoken");

////////////////////////////////////////////////////////////////////////////////
// Middleware for checking if token is valid
////////////////////////////////////////////////////////////////////////////////
const checkToken = (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (token) {
      // Verifies the token stored (if any) is valid and stores the user's
      // info in the 'req.user' variable to be user on next the route
      const user = verify(token, process.env.TOKEN_SECRET);

      if (Date.now() >= user.exp * 1000) {
        res.clearCookie("token");
        return res.status(401).json({ message: "Token Expired!" });
      }
      req.user = user.data;
      next();
    } else {
      return res.status(401).json({ message: "No Token!" });
    }
  } catch (err) {
    // Deletes the invalid token and redirects the user to the main page
    console.error(err);
    res.clearCookie("token");
    return res.status(401).json(err);
  }
};

module.exports = { checkToken };
