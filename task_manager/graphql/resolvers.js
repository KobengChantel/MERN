
const User = require('../models/User');
const Task = require('../models/Task');
const generateToken = require('../utils/generateToken');
const moment = require('moment'); // If you're using moment

module.exports = {
  getUser: async ({ id }) => {
    return await User.findById(id).populate('tasks');
  },

  getTasks: async ({ userId }) => {
    return await Task.find({ user: userId });
  },

  /// Creating a new User
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



  // const moment = require('moment');

  createTask: async ({ title, description, dueDate, priority, userId }) => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Parse and validate the dueDate
    const parsedDueDate = moment(dueDate);
    if (!parsedDueDate.isValid()) {
      throw new Error('Invalid dueDate format');
    }
  
    // Create the new task
    const task = new Task({
      title,
      description,
      dueDate: parsedDueDate.toDate(), // Convert moment object to JavaScript Date
      priority,
      user: userId,
    });
  
    // Save the task and associate it with the user
    const savedTask = await task.save();
    user.tasks.push(savedTask);
    await user.save();
  
    // Return the formatted task
    return {
      id: savedTask._id.toString(), // Ensure `id` is included
      title: savedTask.title,
      description: savedTask.description,
      dueDate: moment(savedTask.dueDate).format('MMMM DD, YYYY'), // Format dueDate
      priority: savedTask.priority,
      completed: savedTask.completed,
    };
  },
  
  
 

  

  updateTask: async ({ id, title, description, dueDate, priority, completed }) => {
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.priority = priority !== undefined ? priority : task.priority;
    task.completed = completed !== undefined ? completed : task.completed;

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

  logout: () => {
    return true; // Typically handled by clearing the token on the client side
  },

  // updateUser: async ({ id, username, email, password, gender, age, city }) => {
  //   const user = await User.findById(id);

  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   if (username) user.username = username;
  //   if (email) user.email = email;
  //   if (password) user.password = password; // Ensure password is hashed before saving
  //   if (gender) user.gender = gender;
  //   if (age) user.age = age;
  //   if (city) user.city = city;

  //   const updatedUser = await user.save();
  //   return updatedUser;
  // },
};
