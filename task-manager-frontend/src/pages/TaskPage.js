import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS, GET_USER } from '../graphql/queries'; // Adjust path if necessary
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../graphql/mutations'; // Adjust path if necessary
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV } from 'react-icons/fa'; // Import the three-dot icon
import '../styles/taskpage.css'; // Import the CSS file

import TaskSearch from '../components/TaskSearch';

const TaskPage = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [editTask, setEditTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State to handle dropdown menu visibility

  const { data: userData } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('userId') }
  });

  const { data: tasksData, refetch } = useQuery(GET_TASKS, {
    variables: { userId: localStorage.getItem('userId') },
    skip: !userData // Skip query if userData is not available yet
  });

  const [createTask, { error: createError }] = useMutation(CREATE_TASK);
  const [updateTask, { error: updateError }] = useMutation(UPDATE_TASK);
  const [deleteTask, { error: deleteError }] = useMutation(DELETE_TASK);
  const navigate = useNavigate();

  useEffect(() => {
    if (editTask) {
      setNewTask(editTask); // Populate the form with the task being edited
    }
  }, [editTask]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await createTask({ variables: { ...newTask, userId: localStorage.getItem('userId') } });
      setSuccessMessage('Task created successfully!');
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
      refetch(); // Refetch tasks to include the newly created task
    } catch (err) {
      setErrorMessage('Failed to create task. Please try again.');
      console.error(err);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await updateTask({ variables: { ...newTask, id: editTask.id } });
      setSuccessMessage('Task updated successfully!');
      setEditTask(null);
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
      refetch();
    } catch (err) {
      setErrorMessage('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask({ variables: { id } });
      setSuccessMessage('Task deleted successfully!');
      refetch();
    } catch (err) {
      setErrorMessage('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  const handleUserProfileClick = () => {
    navigate('/userprofile'); // Redirect to user profile page
    setMenuOpen(false); // Close the menu
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/'); // Redirect to login page
    setMenuOpen(false); // Close the menu
  };

  const userId = localStorage.getItem('userId'); // Retrieve user ID

  return (
    <div className="taskpage-container">
      <div className="header">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaEllipsisV />
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleUserProfileClick}>User Profile</button>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <h1>Task Manager</h1>
      <TaskSearch />
      
      <h2>{editTask ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={editTask ? handleUpdateTask : handleCreateTask} className="task-form">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          required
        >
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">{editTask ? 'Update Task' : 'Create Task'}</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <h2>My Tasks</h2>
      {tasksData && tasksData.getTasks && tasksData.getTasks.length > 0 ? (
        <ul className="task-list">
          {tasksData.getTasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <button onClick={() => setEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available. Create a task above!</p>
      )}
    </div>
  );
};

export default TaskPage;
