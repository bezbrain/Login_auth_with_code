import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

/* ================== */
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
    success,
    setSuccess,
  } = useGlobalContext();

  const [showLoginReg, setShowLoginReg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDbCode();
    console.log(snapshotData);
  }, []);

  /* ============================== */
  /* ============================== */
  //   Click button to register
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      console.log("I cannot be empty");
      setRegError(true);
      setTimeout(() => {
        setRegError(false);
      }, 5000);
      setSuccess(false);
      console.log(success);
    } else {
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          // regName,
          regEmail,
          regPassword
        );
        console.log(cred.user);
        setSuccess(true);
        setRegError(true);
        setTimeout(() => {
          setRegError(false);
        }, 5000);
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setTimeout(() => {
          setShowLoginReg(!showLoginReg);
        }, 3000);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const newSnapshot = snapshotData.map((each) => {
    return each.number;
  });
  // console.log(newSnapshot[0]);

  /* ============================== */
  /* ============================== */
  //   Click button to login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || code !== newSnapshot[0]) {
      console.log("I cannot be empty");
    } else {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log(cred.user);
        navigate("/dashboard");
        setEmail("");
        setPassword("");
        setCode("");
        setCountDown(0);
      } catch (error) {
        console.log(error.message);
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
