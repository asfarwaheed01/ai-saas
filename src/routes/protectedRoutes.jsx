import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🛑 if route is admin-only but user is not admin
    if (adminOnly && !user.is_superuser) {
      return <Navigate to="/docs/getting-started" replace />;
    }

  // ✅ access allowed
  return children;
};

export default ProtectedRoute;
