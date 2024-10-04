const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false },
  // tags: [{ type: String }],
  // category: { type: String },
  // recurring: { type: String, enum: ['daily', 'weekly', 'monthly', null] },
  // attachments: [{ type: String }], // URLs or file paths
  // progress: { type: Number, default: 0 }, // Percentage
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  archived: { // New field
    type: Boolean,
    default: false,
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = mongoose.model('Task', taskSchema);
