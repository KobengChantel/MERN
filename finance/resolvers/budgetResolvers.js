const Budget = require('../models/Budget');

const budgetResolvers = {
  createBudget: async ({ userId, categoryId, limit, period }) => {
    const budget = new Budget({ userId, category: categoryId, limit, spent: 0, period });
    return await budget.save();
  },
  updateBudget: async ({ id, limit, period }) => {
    return await Budget.findByIdAndUpdate(id, { limit, period }, { new: true });
  },
  deleteBudget: async ({ id }) => {
    return await Budget.findByIdAndDelete(id);
  },
};

module.exports = budgetResolvers;
