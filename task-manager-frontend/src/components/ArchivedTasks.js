import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ARCHIVED_TASKS } from '../graphql/queries';

const ArchivedTasks = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_ARCHIVED_TASKS, { variables: { userId } });

  return (
    <div>
      <h2>Archived Tasks</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.getArchivedTasks && (
        <ul>
          {data.getArchivedTasks.map(task => (
            <li key={task.id}>{task.title} - {task.dueDate} - {task.priority}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArchivedTasks;
