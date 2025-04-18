import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = ({ children }) => {
  const isAuthenticated = localStorage.getItem('keralaoffertoken');
  console.log("Authenticated?", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // For route nesting
  return children || <Outlet />;
};

export default Protected;
