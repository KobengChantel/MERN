
// import { AuthProvider } from './context/AuthContext';


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { AuthProvider } from './context/AuthContext';
import TaskPage from './pages/TaskPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';

import HomePage from './pages/HomePage';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<ProtectedRoute element={TaskPage} />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  </ApolloProvider>
);

export default App;

