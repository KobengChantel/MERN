import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASK_STATISTICS } from '../graphql/queries';

const TaskStatistics = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_TASK_STATISTICS, { variables: { userId } });

  return (
    <div>
      <h2>Task Statistics</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.getTaskStatistics && (
        <div>
          <p>Total Tasks: {data.getTaskStatistics.totalTasks}</p>
          <p>Completed Tasks: {data.getTaskStatistics.completedTasks}</p>
          <p>In Progress Tasks: {data.getTaskStatistics.inProgressTasks}</p>
        </div>
      )}
    </div>
  );
};

export default TaskStatistics;
