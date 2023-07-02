import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

/* ================== */
// The Login Component
const LoginReg = () => {
  const {
    regName,
    setRegName,
    regEmail,
    setRegEmail,
    regPassword,
    setRegPassword,
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    snapshotData,
    getDbCode,
    setCountDown,
    setRegError,
    setLoginError,
    setRegSuccess,
    setLoginSuccess,
    setCaughtError,
  } = useGlobalContext();

  const [showLoginReg, setShowLoginReg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDbCode();
    console.log(snapshotData);
  }, []);

  /* ============================== */
  //   Click button to register
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setRegError(true);
      setTimeout(() => {
        setRegError(false);
      }, 5000);
      setRegSuccess(false);
      setCaughtError("");
    } else {
      try {
        await createUserWithEmailAndPassword(
          auth,
          // regName,
          regEmail,
          regPassword
        );
        setRegSuccess(true);
        setRegError(true);
        setTimeout(() => {
          setRegError(false);
        }, 5000);
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setCaughtError("");
        setTimeout(() => {
          setShowLoginReg(!showLoginReg);
        }, 3000);
      } catch (error) {
        // console.log(error.message);
        setCaughtError(extratingErrorMsg(error.message));
        setTimeout(() => {
          setCaughtError("");
        }, 5000);
      }
    }
  };
  /* Function to extract error message from the firebase returned message */
  const extratingErrorMsg = (error) => {
    const startIndex = error.indexOf("/") + 1;
    const endIndex = error.indexOf(")");
    const errorCode = error.substring(startIndex, endIndex);
    // Capitalize the error message
    const capitalizedError =
      errorCode.charAt(0).toUpperCase() + errorCode.slice(1).toLowerCase();
    return capitalizedError;
  };

  const newSnapshot = snapshotData.map((each) => {
    return each.number;
  });
  // console.log(newSnapshot[0]);

  /* ======================= */
  //   Click button to login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !code) {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 5000);
      setLoginSuccess(false);
      setCaughtError("");
    } else {
      try {
        if (code !== newSnapshot[0]) {
          setCaughtError("Incorrect code");
          setTimeout(() => {
            setCaughtError("");
          }, 5000);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
          setLoginSuccess(true);
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 5000);
          setEmail("");
          setPassword("");
          setCode("");
          setCountDown(0);
        }
      } catch (error) {
        console.log(error.message);
        setCaughtError(extratingErrorMsg(error.message));
        setTimeout(() => {
          setCaughtError("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <Login
        Register={showLoginReg}
        clickToReg={() => {
          setShowLoginReg(!showLoginReg);
          setEmail("");
          setPassword("");
          setCode("");
        }}
        handleLoginSubmitProp={handleLoginSubmit}
      />
      <Register
        Login={showLoginReg}
        clickToLogin={() => {
          setShowLoginReg(!showLoginReg);
          setRegName("");
          setRegEmail("");
          setRegPassword("");
        }}
        handleRegSubmitProp={handleRegSubmit}
      />
    </>
  );
};

export default LoginReg;
