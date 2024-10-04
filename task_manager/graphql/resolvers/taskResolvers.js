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

    const task = new Task({
      title,
      description,
      dueDate,
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

    // Update the task fields if provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

    // Format the dueDate if provided
    if (dueDate) {
      const formattedDate = moment(dueDate, 'MM/DD/YYYY').format('DD/MM/YYYY');
      task.dueDate = formattedDate;
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
