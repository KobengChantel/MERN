import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations'; // Import the mutation
import { useNavigate } from 'react-router-dom';
import '../styles/userprofile.css'; // Import the CSS file

const UserProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get the userId from localStorage

  const { data: userData, loading, error } = useQuery(GET_USER, {
    variables: { id: userId },
    skip: !userId, // Skip the query if userId is not available
  });

  const [updateUser, { data: updateData, loading: updating, error: updateError }] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    city: '',
    gender: '',
    age: '',
  });

  const [isEditing, setIsEditing] = useState(false); // State to control form visibility

  useEffect(() => {
    if (userData && userData.getUser) {
      setFormData({
        username: userData.getUser.username,
        email: userData.getUser.email,
        city: userData.getUser.city || '',
        gender: userData.getUser.gender || '',
        age: userData.getUser.age || '',
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        id: userId,
        ...formData,
      },
    }).then(() => {
      setIsEditing(false); // Hide the form after successful update
    });
  };

  const handleBackClick = () => {
    navigate('/tasks'); // Redirect to tasks page
  };

  const handleEditClick = () => {
    setIsEditing(true); // Show the form when "Update Profile" is clicked
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="userprofile-container">
      <button className="back-button" onClick={handleBackClick}>Back to Tasks</button>

      <h1>User Profile</h1>
      {userData && userData.getUser && (
        <div>
          {!isEditing ? (
            <div className="profile-info">
              <p><strong>Username:</strong> {userData.getUser.username}</p>
              <p><strong>Email:</strong> {userData.getUser.email}</p>
              <p><strong>City:</strong> {userData.getUser.city}</p>
              <p><strong>Gender:</strong> {userData.getUser.gender}</p>
              <p><strong>Age:</strong> {userData.getUser.age}</p>
              <button className="edit-button" onClick={handleEditClick}>Update Profile</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit" disabled={updating}>Save Changes</button>
              {updateData && <p>Profile updated successfully!</p>}
              {updateError && <p>Error: {updateError.message}</p>}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
