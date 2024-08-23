import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN } from '../graphql/mutations'; // Update this import
import '../styles/homepage.css'; // Import the CSS file

const HomePage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [createUser, { loading: registerLoading, error: registerError }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN); // Use LOGIN mutation

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: { username, email, password } });
      localStorage.setItem('token', data.createUser.token);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username: loginUsername, password: loginPassword } });
      localStorage.setItem('token', data.login.token);
      setLoginUsername('');
      setLoginPassword('');
    } catch (err) {
      console.error(err);
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="homepage-button" disabled={registerLoading}>
            Register
          </button>
          {registerError && <p className="error-message">Error: {registerError.message}</p>}
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
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" className="homepage-button" disabled={loginLoading}>
              Login
            </button>
            {loginError && <p className="error-message">Error: {loginError.message}</p>}
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
