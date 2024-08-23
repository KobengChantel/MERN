import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Ensure this path matches your project structure

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { username, password } });
      if (response.data.login.token) {
        localStorage.setItem('token', response.data.login.token);
        localStorage.setItem('userId', response.data.login.user.id);
        setSuccessMessage('Login successful! Redirecting to your tasks...');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/tasks'); // Redirect to tasks page after a delay
        }, 2000); // Redirect after 2 seconds to allow users to see the message
      }
    } catch (err) {
      setSuccessMessage('');
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to registration page
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>Login</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <button className="register-button" onClick={handleRegisterClick}>
        Register
      </button>
    </div>
  );
};

export default LoginPage;
