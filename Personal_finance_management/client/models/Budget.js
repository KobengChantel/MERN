//DEFINES THE BUDGET SCHEMA

const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
limit: { type: Number, required: true},
spent: { type: Number, default:0},
period: { type: String, enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'], required: true},
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = { Budget };