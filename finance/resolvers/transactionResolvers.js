const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

const transactionResolvers = {
  createTransaction: async ({ userId, amount, date, description, categoryId, type }) => {
    const transaction = new Transaction({ userId, amount, date, description, category: categoryId, type });
    return await transaction.save();
  },
  updateTransaction: async ({ id, amount, date, description, categoryId, type }) => {
    return await Transaction.findByIdAndUpdate(id, { amount, date, description, category: categoryId, type }, { new: true });
  },
  deleteTransaction: async ({ id }) => {
    return await Transaction.findByIdAndDelete(id);
  },
};

module.exports = transactionResolvers;
