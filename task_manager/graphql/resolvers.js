const User = require('../models/User');
const Task = require('../models/Task');
const generateToken = require('../utils/generateToken');

module.exports = {
  getUser: async ({ id }) => {
    return await User.findById(id).populate('tasks');
  },

  getTasks: async ({ userId }) => {
    return await Task.find({ user: userId });
  },

  createUser: async ({ username, email, password }) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = new User({
      username,
      email,
      password,
    });

    const savedUser = await user.save();

    return {
      user: savedUser,
      token: generateToken(savedUser._id),
    };
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
// UPDATETASK
  updateTask: async ({ id, title, description, dueDate, priority, completed }) => {
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    return updatedTask;
  },

  deleteTask: async ({ id }) => {
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    await task.remove();
    return task;
  },

  login: async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      user,
      token: generateToken(user._id),
      
    };
  },

  logout: () => {
    // Typically handled on the client side by clearing the token
    return true;
  },
};