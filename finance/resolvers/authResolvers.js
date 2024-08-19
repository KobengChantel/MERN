const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY ='somesupersecretkey';

const authResolvers = {
  createUser: async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return { token, user };
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('No user found with this email');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return { token, user };
  },
};

module.exports = authResolvers;
