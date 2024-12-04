// import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { SEARCH_TASKS } from '../graphql/queries';

// const TaskSearch = () => {
//   const [searchParams, setSearchParams] = useState({
//     title: '',
//   });

//   // Use the searchParams state to pass variables to the query
//   const { data, loading, error } = useQuery(SEARCH_TASKS, {
//     variables: {
//       title: searchParams.title || '', // Only pass the title to search
//     },
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     // The query will automatically re-trigger due to the updated variables
//   };

//   return (
//     <div>
//       <h2>Search Tasks</h2>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           name="title"
//           value={searchParams.title}
//           onChange={handleChange}
//           placeholder="Search by Title"
//         />
//         <button type="submit">Search</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>}
//       {data && data.searchTasks && (
//         <ul>
//           {data.searchTasks.map((task) => (
//             <li key={task.id}>
//               {task.title} - {task.dueDate} - {task.priority}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TaskSearch;
