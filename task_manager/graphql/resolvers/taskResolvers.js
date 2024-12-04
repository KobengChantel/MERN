const Task = require('../../models/Task'); // Adjust path if needed
const User = require('../../models/User');
const moment = require('moment');

module.exports = {
  getTasks: async ({ userId }) => {
    return await Task.find({ user: userId });
  },

  createTask: async ({ title, description, dueDate, priority, userId }) => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Parse dueDate to ensure it's a valid Date
    let parsedDueDate = moment(dueDate);
    if (!parsedDueDate.isValid()) {
      throw new Error('Invalid dueDate format');
    }
  
    // Create task with a valid Date object for dueDate
    const task = new Task({
      title,
      description,
      dueDate: parsedDueDate.toDate(),  // Store as Date object
      priority,
      user: userId,
    });
  
    const savedTask = await task.save();
    user.tasks.push(savedTask);
    await user.save();
  
    return savedTask;
  },
  

  updateTask: async ({ id, title, description, dueDate, priority, completed }) => {
    const task = await Task.findById(id);
  
    if (!task) {
      throw new Error('Task not found');
    }
  
    // Update task fields if provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;
  
    // If dueDate is provided, parse and save it as a Date object
    if (dueDate) {
      const parsedDueDate = moment(dueDate);
      if (!parsedDueDate.isValid()) {
        throw new Error('Invalid dueDate format');
      }
      task.dueDate = parsedDueDate.toDate();  // Save as Date object
    }
  
    const updatedTask = await task.save();
    return updatedTask;
  },
  

  deleteTask: async ({ id }) => {
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    await Task.deleteOne({ _id: id });
    return task;
  },
};
