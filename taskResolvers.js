const Task = require('./task_manager/models/Task'); // Adjust path if needed
const User = require('./task_manager/models/User');
const moment = require('moment');

module.exports = {
  // getTasks: async ({ userId }) => {
  // const tasks = await Task.find({ user: userId });
  // Format the dueDate to a human-readable format using Moment.js
  // const formattedTasks = tasks.map(task => ({
  //   ...task.toObject(), // Convert Mongoose document to plain JavaScript object
//     dueDate: moment(task.dueDate).format('MMMM DD, YYYY') // Format the date
//   }));

//   return formattedTasks;
// },


getTasks: async ({ userId }) => {
  const tasks = await Task.find({ user: userId }).lean(); // Fetch tasks as plain objects

  const formattedTasks = tasks.map((task) => {
    console.log(task.dueDate); // Debug: Log the original dueDate
    return {
      ...task,
      dueDate: moment(task.dueDate).isValid()
        ? moment(task.dueDate).format('MMMM DD, YYYY') // Format if valid
        : 'Invalid Date', // Fallback for invalid dates
    };
  });

  return formattedTasks;
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
