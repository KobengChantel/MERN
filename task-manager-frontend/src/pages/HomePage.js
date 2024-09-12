import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css'; // Ensure the path matches your project structure

const HomePage = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createUser, { loading: registerLoading, error: registerError }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN);
  const navigate = useNavigate();

  // Handle Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: { username, email, password } });
      if (data.createUser) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        setErrorMessage('');
        setTimeout(() => {
          setIsRegistering(false); // Switch to login view after success
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setSuccessMessage('');
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username: loginUsername, password: loginPassword } });
      if (data.login.token) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('userId', data.login.user.id);
        setSuccessMessage('Login successful! Redirecting to your tasks...');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/tasks');
        }, 2000); // Delay for user feedback
      }
    } catch (err) {
      console.error('Login error:', err);
      setSuccessMessage('');
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Task Manager</h1>

      {isRegistering ? (
        <form onSubmit={handleRegisterSubmit} className="homepage-form">
          <h2>Register</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️'}
            </button>
          </div>
          <button type="submit" className="homepage-button" disabled={registerLoading}>
            Register
          </button>
          {registerError && <p className="error-message">Error: {registerError.message}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" onClick={() => setIsRegistering(false)} className="homepage-button">
            Back to Login
          </button>
        </form>
      ) : (
        <div>
          <form onSubmit={handleLoginSubmit} className="homepage-form">
            <h2>Login</h2>
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              placeholder="Email"
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️'}
              </button>
            </div>
            <button type="submit" className="homepage-button" disabled={loginLoading}>
              Login
            </button>
            {loginError && <p className="error-message">Error: {loginError.message}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          <button type="button" onClick={() => setIsRegistering(true)} className="homepage-button">
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
