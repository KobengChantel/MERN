//DEFINES THE USER SCHEMA

mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Fixed 'require' to 'required'
  email: {
    type: String,
    required: true, // Fixed 'require' to 'required'
    unique: true
  },
  password: {
    type: String,
    required: true // Fixed 'require' to 'required'
  },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Budget' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
