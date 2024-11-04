import React from "react";
import { Navigate } from "react-router-dom";

const getUserRole = () => {
  const roleData = localStorage.getItem("roles");
  try {
    const parsedRole = JSON.parse(roleData);
    console.log("Parsed user role:", parsedRole); 
    return parsedRole?.[0]?.name; 
  } catch (error) {
    console.error("Failed to parse user role:", error);
    return null;
  }
};

function PrivateRoute({ element, requiredRole }) {
  const userRole = getUserRole();

  if (userRole === requiredRole) {
    return element;
  } else {
    console.log(`Access denied. Required role: ${requiredRole}, User role: ${userRole}`); 
    return <Navigate to="/no-access" replace />;
  }
}

export default PrivateRoute;
