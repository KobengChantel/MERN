
const User = require('../models/User');
const Task = require('../models/Task');
const generateToken = require('../utils/generateToken');
const moment = require('moment');

module.exports = {
  getUser: async ({ id }) => {
    return await User.findById(id).populate('tasks');
  },

  getTasks: async ({ userId }) => {
    return await Task.find({ user: userId });
  },

  createUser: async ({ username, email, password, gender, age, city }) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = new User({
      username,
      email,
      password,
      gender,
      age,
      city,
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

  // Update an existing task
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
  const formattedDate = moment(dueDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
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

  // User login logic (updated to use email)
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });

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

  // Handle logout
  logout: () => {
    return true; // Typically handled by clearing the token on the client side
  },
  
};

const resolvers = {
  Mutation: {
    updateUser: async (_, { id, username, email, city, gender, age }) => {
      try {
        const user = await User.findById(id); // Fetch the user
        if (!user) {
          throw new Error('User not found');
        }

        // Update user fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (city) user.city = city;
        if (gender) user.gender = gender;
        if (age) user.age = age;

        await user.save(); // Save the updated user

        return user;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
      }
    },
  },
};



 
