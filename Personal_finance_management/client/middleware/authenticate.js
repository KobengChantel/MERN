const jwt = require('jsonwebtoken');
const { User } = require ('..models/User');

const authenticate = async (req, res, next) => {
  const token = req. headers.authorization;
  if(!token) {
    return res.status(401).json({ message: 'No token provided'});

  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401)
.json({message: 'Invalid token'});
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ messages: 'Invalid token'})
  }
};

module.exports = authentication;