import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🚫 لا يوجد توكن → رجّع المستخدم لصفحة الدخول
    return <Navigate to="/login" replace />;
  }

  return children; // ✅ المستخدم مسجل الدخول
};

export default ProtectedRoute;
