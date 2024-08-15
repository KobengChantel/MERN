//RESOLVERS:::CONTAINS GRAPHQL RESOLVERS THAT HANDLE QUIRIES AND MUTATION


//INDEX.JS DEFINES AND EXPORTS THE RESOLVERS

// const { generateToken, verifyToken } = require('../utils/auth')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { Transaction } = require('../models/Transaction');
const { Budget } = require('../models/Budget');
const { Category } = require('../models/Category');

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return User.findById(id);
    },
    transactions: async (_, { userId }) => {
      return Transaction.find({ userId });
    },
    budgets: async (_, { userId }) => {
      return Budget.find({ userId });
    },
    categories: async (_, { userId }) => {
      return Category.find({ userId });
    },
  },
  
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token, user };
        
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },
    createTransaction: async (_, { userId, amount, date, description, categoryId, type }) => {
      try {
        const transaction = new Transaction({ userId, amount, date, description, category: categoryId, type });
        return transaction.save();
      } catch (error) {
        console.error('Error creating transaction:', error);
        throw new Error('Error creating transaction');
      }
    },
    createBudget: async (_, { userId, categoryId, limit, period }) => {
      try {
        const budget = new Budget({ userId, category: categoryId, limit, period });
        return budget.save();
      } catch (error) {
        console.error('Error creating budget:', error);
        throw new Error('Error creating budget');
      }
    },
    createCategory: async (_, { userId, name, color }) => {
      try {
        const category = new Category({ userId, name, color });
        return category.save();
      } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Error creating category');
      }
    },
    updateTransaction: async (_, { id, ...update }) => {
      try {
        return Transaction.findByIdAndUpdate(id, update, { new: true });
      } catch (error) {
        console.error('Error updating transaction:', error);
        throw new Error('Error updating transaction');
      }
    },
    updateBudget: async (_, { id, ...update }) => {
      try {
        return Budget.findByIdAndUpdate(id, update, { new: true });
      } catch (error) {
        console.error('Error updating budget:', error);
        throw new Error('Error updating budget');
      }
    },
    updateCategory: async (_, { id, ...update }) => {
      try {
        return Category.findByIdAndUpdate(id, update, { new: true });
      } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Error updating category');
      }
    },
    deleteTransaction: async (_, { id }) => {
      try {
        return Transaction.findByIdAndRemove(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
        throw new Error('Error deleting transaction');
      }
    },
    deleteBudget: async (_, { id }) => {
      try {
        return Budget.findByIdAndRemove(id);
      } catch (error) {
        console.error('Error deleting budget:', error);
        throw new Error('Error deleting budget');
      }
    },
    deleteCategory: async (_, { id }) => {
      try {
        return Category.findByIdAndRemove(id);
      } catch (error) {
        console.error('Error deleting category:', error);
        throw new Error('Error deleting category');
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return { token, user };
      } catch (error) {
        console.error('Error during login:', error);
        throw new Error('Error during login');
      }
    },
  },
};

module.exports = resolvers;
