import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useGlobalContext } from "../context";

const Dashboard = ({ handleLogoutProp }) => {
  const { getAuth, initializeApp, firebaseConfig } = useGlobalContext();

  initializeApp(firebaseConfig);
  const auth = getAuth();

  const navigation = useNavigate();

  /* ==================== */
  // Logout Function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("You are logged out");
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
