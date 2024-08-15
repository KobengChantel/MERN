// UTILS CONTAINS UTILS FUNCTIONS
//AUTH.JS HELPER FUNCTIONS FOR AUTHENTICATION SUCH AS GENERATING AND VERYFYING JWTS


const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h'});
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
   generateToken,
   verifyToken
}