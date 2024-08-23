import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { AuthProvider } from './context/AuthContext';
// import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import TaskListPage from './pages/TaskListPage';
// Remove or comment out the Header import
// import Header from './components/Header';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        {/* Remove or comment out the Header component */}
        {/* <Header /> */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/tasks" element={<ProtectedRoute element={TaskPage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasklist" element={<TaskListPage />} />
          <Route path="/userprofile" element={<UserProfilePage />} /> {/* Add the UserProfilePage route */}
        </Routes>
      </AuthProvider>
    </Router>
  </ApolloProvider>
);

export default App;
