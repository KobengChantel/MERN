const userResolvers = require('./userResolvers');
const transactionResolvers = require('./transactionResolvers');
const budgetResolvers = require('./budgetResolvers');
const categoryResolvers = require('./categoryResolvers');
const authResolvers = require('./authResolvers');

const resolvers = {
  ...userResolvers,
  ...transactionResolvers,
  ...budgetResolvers,
  ...categoryResolvers,
  ...authResolvers,
};

module.exports = resolvers;
