import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '../graphql/mutations';
import { GET_USER } from '../graphql/queries'; // Assume you have a query to get user info
import { useNavigate } from 'react-router-dom';
import '../styles/taskmanagement.css';

const TaskManagementPage = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]); // Local state to manage tasks

  const navigate = useNavigate();

  const { data: userData } = useQuery(GET_USER, {
    variables: { userId: localStorage.getItem('userId') },
  });

  const [createTask, { loading: createLoading, error: createError }] = useMutation(CREATE_TASK, {
    onCompleted: () => fetchTasks(),
  });
  const [deleteTask, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TASK, {
    onCompleted: () => fetchTasks(),
  });
  const [updateTask, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TASK, {
    onCompleted: () => fetchTasks(),
  });

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [userData]);

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks on component mount

  const fetchTasks = async () => {
    try {
      // Fetch tasks directly from your API or backend service
      // Replace this with the actual API call or logic
      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({ variables: { ...newTask, userId: localStorage.getItem('userId') } });
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await updateTask({ variables: { ...editingTask, userId: localStorage.getItem('userId') } });
      setEditingTask(null);
      setSelectedTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask({ variables: { id: taskId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedTask(task);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/'); // Redirect to login or home page
  };

  return (
    <div className="taskmanagement-container">
      <h1>Task Management</h1>
      
      <button onClick={handleLogout} className="logout-button">Logout</button>
      
      <div className="user-profile">
        <h2>User Profile</h2>
        {user && (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
      
      <form onSubmit={handleCreateTask} className="task-form">
        <h2>Create Task</h2>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Title"
          required
        />
        <input
          type="text"
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
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit" disabled={createLoading}>Create Task</button>
        {createError && <p className="error-message">Error: {createError.message}</p>}
      </form>
      
      {selectedTask && (
        <form onSubmit={handleUpdateTask} className="task-form">
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
          />
          <select
            value={editingTask.priority}
            onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" disabled={updateLoading}>Update Task</button>
          {updateError && <p className="error-message">Error: {updateError.message}</p>}
        </form>
      )}

      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <button onClick={() => handleViewTask(task)}>View</button>
          <button onClick={() => handleEditTask(task)}>Edit</button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskManagementPage;
