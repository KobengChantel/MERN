import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries';
import TaskItem from './TaskItem';

const TaskList = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: { userId },
  });
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.getTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
