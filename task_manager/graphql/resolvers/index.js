const userResolvers = require('./userResolvers');
const taskResolvers = require('./taskResolvers');

module.exports = {
  Query: {
    ...userResolvers,
    ...taskResolvers,
  },
  Mutation: {
    ...userResolvers,
    ...taskResolvers,
  },
};
