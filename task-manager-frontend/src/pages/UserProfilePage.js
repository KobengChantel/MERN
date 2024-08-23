import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import '../styles/userprofile.css'; // Import the CSS file

const UserProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get the userId from localStorage
  const { data: userData } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, // Skip the query if userId is not available
  });

  const handleBackClick = () => {
    navigate('/tasks'); // Redirect to tasks page
  };

  return (
    <div className="userprofile-container">
      <button className="back-button" onClick={handleBackClick}>Back to Tasks</button>

      <h1>User Profile</h1>
      {userData && (
        <div className="profile-info">
          <p><strong>Username:</strong> {userData.getUser.username}</p>
          <p><strong>Email:</strong> {userData.getUser.email}</p>
          {/* Removed "My Tasks" section */}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
