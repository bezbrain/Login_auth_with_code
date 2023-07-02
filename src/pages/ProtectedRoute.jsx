import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import Dashboard from "./Dashboard";

const ProtectedRoute = () => {
  const { colRef } = useGlobalContext();

  console.log(colRef);
  if (!colRef) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Dashboard />
    </>
  );
};

export default ProtectedRoute;
