import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import Dashboard from "./Dashboard";

const ProtectedRoute = () => {
  const { checkIfUserIsLoggedIn } = useGlobalContext();

  if (checkIfUserIsLoggedIn === "") {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Dashboard />
    </>
  );
};

export default ProtectedRoute;
