
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



  createTask: async ({ title, description, dueDate, priority, userId }) => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Ensure dueDate is a valid Unix timestamp or date string
    let parsedDueDate;
    try {
      // If dueDate is a Unix timestamp (in milliseconds), moment will parse it correctly.
      parsedDueDate = moment(dueDate);  // Parse the dueDate value (Unix timestamp or string)
      
      if (!parsedDueDate.isValid()) {
        throw new Error('Invalid date format');
      }
  
      // Log the formatted date in 'YYYY/MM/DD' format (optional)
      console.log(parsedDueDate.format('YYYY/MM/DD'));  // Output: formatted date as 'YYYY/MM/DD'
      
    } catch (error) {
      throw new Error('Invalid dueDate format');
    }
  
    // Create a new task with the parsed and formatted date
    const task = new Task({
      title,
      description,
      dueDate: parsedDueDate.toDate(),  // Convert the moment object to a JavaScript Date object
      priority,
      user: userId,
    });
  
    const savedTask = await task.save();
    user.tasks.push(savedTask);
    await user.save();
  
    return savedTask;
  },
  
  
  searchTasks: async ({ title }) => {
    // Build the search query
    let searchQuery = {};
    if (title) {
      searchQuery.title = { $regex: title, $options: 'i' }; 
    }

    // Perform the search
    const tasks = await Task.find(searchQuery);
    return tasks;
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

  getArchivedTasks: async ({ userId }) => {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Fetch tasks that are archived
    return await Task.find({ user: userId, archived: true });
  },

  restoreTask: async ({ id }) => {
    const task = await Task.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    // Set the task as not archived
    task.archived = false;
    await task.save();

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

  updateUser: async ({ id, username, email, password, gender, age, city }) => {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // Ensure password is hashed before saving
    if (gender) user.gender = gender;
    if (age) user.age = age;
    if (city) user.city = city;

    const updatedUser = await user.save();
    return updatedUser;
  },
};
