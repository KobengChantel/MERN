//DEFINES THE CATEGORY SCHEMA

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }, // Changed to Date type
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema); // Corrected model name

module.exports = { Transaction }; // Corrected export name
