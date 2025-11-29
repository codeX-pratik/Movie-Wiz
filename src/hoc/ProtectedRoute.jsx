import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
  
  if (!isLoggedIn) {
    return <h2>Please Login to Continue</h2>;
  }

  return children;
};

export default ProtectedRoute;
