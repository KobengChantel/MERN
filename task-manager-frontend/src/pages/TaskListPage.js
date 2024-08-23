import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries'; // Adjust path as needed
import { UPDATE_TASK, DELETE_TASK } from '../graphql/mutations'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import '../styles/tasklistpage.css'; // Import the CSS file for styling

const TaskListPage = () => {
  const [editTask, setEditTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: '', description: '', dueDate: '', priority: '', completed: false });
  const { data: tasksData, loading, error, refetch } = useQuery(GET_TASKS);
  const [updateTask, { error: updateError }] = useMutation(UPDATE_TASK);
  const [deleteTask, { error: deleteError }] = useMutation(DELETE_TASK);
  const navigate = useNavigate();

  useEffect(() => {
    if (editTask) {
      setUpdatedTask(editTask);
    }
  }, [editTask]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await updateTask({ variables: { ...updatedTask, id: editTask.id } });
      setEditTask(null);
      setUpdatedTask({ title: '', description: '', dueDate: '', priority: '', completed: false });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask({ variables: { id } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (task) => {
    setEditTask(task);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
    setUpdatedTask({ title: '', description: '', dueDate: '', priority: '', completed: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

  return (
    <div className="tasklistpage-container">
      <h1>Task List</h1>
      {tasksData && tasksData.tasks.length > 0 ? (
        <ul className="task-list">
          {tasksData.tasks.map((task) => (
            <li key={task.id} className="task-item">
              {editTask && editTask.id === task.id ? (
                <form onSubmit={handleUpdateTask} className="task-form">
                  <input
                    type="text"
                    name="title"
                    value={updatedTask.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                  />
                  <textarea
                    name="description"
                    value={updatedTask.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    name="dueDate"
                    value={updatedTask.dueDate}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="priority"
                    value={updatedTask.priority}
                    onChange={handleInputChange}
                    placeholder="Priority"
                  />
                  <label>
                    Completed:
                    <input
                      type="checkbox"
                      name="completed"
                      checked={updatedTask.completed}
                      onChange={(e) => setUpdatedTask({ ...updatedTask, completed: e.target.checked })}
                    />
                  </label>
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                  {updateError && <p className="error-message">Error updating task: {updateError.message}</p>}
                </form>
              ) : (
                <>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Due Date:</strong> {task.dueDate}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  {deleteError && <p className="error-message">Error deleting task: {deleteError.message}</p>}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskListPage;
