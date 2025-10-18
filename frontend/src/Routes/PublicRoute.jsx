import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.jwt);

  if (token) {
    
    const user = jwtDecode(token);
    return <Navigate to={`/${user?.role?.toLowerCase()}/dashboard`} />;
  }

  return children;
};

export default PublicRoute;
