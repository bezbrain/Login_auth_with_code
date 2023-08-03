import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import Dashboard from "./Dashboard";

const ProtectedRoute = ({children}) => {
  const { checkIfUserIsLoggedIn } = useGlobalContext();

  if (checkIfUserIsLoggedIn === "") {
    return <Navigate to="/" />;
  }
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
