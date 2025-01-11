const jwt = require("jsonwebtoken");

// Middleware to check if the user is admin or user
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, process.env.USERSECRET_KEY);
      req.user = decoded; 

      // If roles are passed in the middleware, check if the user's role matches
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied 🚫" });
      }

      next(); 
    } catch (err) {
      return res.status(401).json({ message: "Invalid token ❌" });
    }
  };
};

module.exports = authMiddleware;
