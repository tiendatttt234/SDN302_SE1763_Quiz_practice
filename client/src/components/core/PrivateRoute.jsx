import React from 'react';
import { Navigate } from 'react-router-dom';
// import { AuthService } from '../../../core/services/auth.service';

const PrivateRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const userRoles = JSON.parse(localStorage.getItem('userRoles')) || []; // Retrieve user roles from local storage

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  return hasAccess ? Component : <Navigate to="/no-access" replace />;
};

export default PrivateRoute;