import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK, DELETE_TASK } from '../graphql/mutations';

const TaskItem = ({ task }) => {
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleComplete = async () => {
    await updateTask({
      variables: { id: task.id, completed: !task.completed },
    });
  };

  const handleDelete = async () => {
    await deleteTask({
      variables: { id: task.id },
    });
  };

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
      <button onClick={handleComplete}>
        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TaskItem;
