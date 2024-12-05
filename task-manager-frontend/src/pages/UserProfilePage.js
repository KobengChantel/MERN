import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import '../styles/userprofile.css'; // Import the CSS file

const UserProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get the userId from localStorage

  const { data: userData, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, // Skip the query if userId is not available
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleBackClick = () => {
    navigate('/tasks'); // Redirect to tasks page
  };

  return (
    <div className="userprofile-container">
      <button className="back-button" onClick={handleBackClick}>Back to Tasks</button>

      <h1>User Profile</h1>
      {userData && userData.getUser && (
        <div className="profile-info">
          <p><strong>Username:</strong> {userData.getUser.username}</p>
          <p><strong>Email:</strong> {userData.getUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
