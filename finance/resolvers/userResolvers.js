const User = require('../models/User');

const userResolvers = {
  user: async ({ id }) => {
    return await User.findById(id).populate('transactions').populate('budgets').populate('categories');
  },
  transactions: async ({ userId }) => {
    return await Transaction.find({ userId }).populate('category');
  },
  budgets: async ({ userId }) => {
    return await Budget.find({ userId }).populate('category');
  },
  categories: async ({ userId }) => {
    return await Category.find({ userId });
  },
};

module.exports = userResolvers;
