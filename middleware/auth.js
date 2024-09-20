const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization").replace("Bearer ", "");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
