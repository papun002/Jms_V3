// authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const SECRET_KEY_HASH = dotenv.parsed.SECRET_KEY_HASH

const extractUserIdFromToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ status: "401", error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, SECRET_KEY_HASH, (err, decoded) => {
      if (err) {
          return res.status(401).json({ status: "401", error: "Unauthorized: Invalid token" });
      }
      req.id = decoded._id; // Attach decoded username to request object
      req.username = decoded.username; // Attach decoded username to request object
      // console.log(decoded.username);
      console.log("id",decoded._id);
      next();
  });
};


module.exports = extractUserIdFromToken;

