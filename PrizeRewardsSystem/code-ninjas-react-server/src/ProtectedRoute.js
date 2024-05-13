// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Use Navigate for redirection in React Router v6
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
