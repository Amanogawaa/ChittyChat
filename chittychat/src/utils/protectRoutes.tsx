import { useAuth } from "@/context/authContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = () => {
  const { token } = useAuth();

  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectRoutes;
