import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // To display success or error messages
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset messages
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password }
      );

      if (response.data.success) {
        setMessage(response.data.message); // Show success message
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        setError(error.response.data.message || 'An error occurred');
      } else {
        // Network or other errors
        setError('Unable to connect to the server. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2x1 font-bold mb-4">Signup</h2>

        {message && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="Enter UserName"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border"
              placeholder="Enter Password"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700"
            >
              Signup
            </button>
          </div>
        </form>

        <p className="text-center">
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
