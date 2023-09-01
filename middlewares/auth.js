const jwt = require("jsonwebtoken");
const ActiveSession = require("../schemas/Session");
const User = require("../schemas/User")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    console.log("token", token);
    try {
        const decodedToken = jwt.verify(token, 'secret');
        req.User = { _id: decodedToken._id, email: decodedToken.email, role:decodedToken.role };
        console.log(req.User);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const requireLogin = async (req, res, next) => {
  const sessionId = req.cookies.userId;
  if (sessionId) {
    const activeSession = await ActiveSession.findOne({ sessionId });
    if (activeSession) {
      // Check if the session is expired
      const sessionTimeout = 15 * 60 * 1000; // 30 minutes
      const sessionExpiration = new Date(activeSession.lastActivity.getTime() + sessionTimeout);
      const currentTime = new Date();
      if (sessionExpiration > currentTime && activeSession.expireAt<currentTime ) {
        // Renew session upon user activity and extend expiration time
        activeSession.lastActivity = currentTime;
        await activeSession.save();

        // Set the renewed session ID as a cookie
        res.cookie('sessionId', sessionId, { httpOnly: true });
        req.user = await User.findOne({ email: activeSession.email });
        return next();
      }
    }
  }
  // Session is expired or user not logged in, send an error response
  res.status(401).json({ error: 'Unauthorized' });
};

module.exports = {authMiddleware, requireLogin};