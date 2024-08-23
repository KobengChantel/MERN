import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS, GET_USER } from '../graphql/queries';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import '../styles/taskpage.css'; // Import the CSS file

const TaskPage = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [editTask, setEditTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { data: tasksData, refetch } = useQuery(GET_TASKS);
  const { data: userData } = useQuery(GET_USER);
  const [createTask, { error: createError }] = useMutation(CREATE_TASK);
  const [updateTask, { error: updateError }] = useMutation(UPDATE_TASK);
  const [deleteTask, { error: deleteError }] = useMutation(DELETE_TASK);
  const navigate = useNavigate();

  useEffect(() => {
    if (editTask) {
      setNewTask(editTask);
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
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="taskpage-container">
      <div className="header-buttons">
        <button className="user-profile-button" onClick={handleUserProfileClick}>User Profile</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <h1>Task Manager</h1>
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
        <input
          type="text"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          placeholder="Priority"
        />
        <button type="submit">{editTask ? 'Update Task' : 'Create Task'}</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <h2>My Tasks</h2>
      {tasksData && tasksData.tasks.length > 0 ? (
        <ul className="task-list">
          {tasksData.tasks.map((task) => (
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
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskPage;
