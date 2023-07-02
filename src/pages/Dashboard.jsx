import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useGlobalContext } from "../context";

const Dashboard = () => {
  const { auth, checkIfUserIsLoggedIn, setCheckIfUserIsLoggedIn } =
    useGlobalContext();

  const navigation = useNavigate();

  /* ==================== */
  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("You are logged out");
      setCheckIfUserIsLoggedIn("");
      console.log(checkIfUserIsLoggedIn);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dashboard-con">
        <h2>This is the Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
