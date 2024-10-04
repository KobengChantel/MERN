import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_TASKS } from '../graphql/queries';

const TaskSearch = () => {
  const [searchParams, setSearchParams] = useState({ title: '', dueDate: '', description: '', priority: '' });
  const { data, loading, error } = useQuery(SEARCH_TASKS, { variables: searchParams });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger search
  };

  return (
    <div>
      <h2>Search Tasks</h2>
      <form onSubmit={handleSearch}>
        <input type="text" name="title" value={searchParams.title} onChange={handleChange} placeholder="Title" />
        <input type="date" name="dueDate" value={searchParams.dueDate} onChange={handleChange} />
        <input type="text" name="description" value={searchParams.description} onChange={handleChange} placeholder="Description" />
        <select name="priority" value={searchParams.priority} onChange={handleChange}>
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.searchTasks && (
        <ul>
          {data.searchTasks.map(task => (
            <li key={task.id}>{task.title} - {task.dueDate} - {task.priority}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskSearch;
