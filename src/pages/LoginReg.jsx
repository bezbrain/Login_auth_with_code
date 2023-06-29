import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

import { collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
    firebaseConfig,
    initializeApp,
    codeNumbers,
    countDown,
    setCountDown,
    getCode,
    setGetCode,
    theCodeItself,
    setTheCodeItself,
    getCurrentCode,
    // concat,
  } = useGlobalContext();

  const [showLoginReg, setShowLoginReg] = useState(null);
  const navigate = useNavigate();

  initializeApp(firebaseConfig);

  const db = getFirestore();
  const auth = getAuth();

  const colRef = collection(db, "login");

  /* ============================== */
  /* ============================== */
  //   Click button to register
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      console.log("I cannot be empty");
    } else {
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          // regName,
          regEmail,
          regPassword
        );
        console.log(cred.user);
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setShowLoginReg(!showLoginReg);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  /* ============================== */
  /* ============================== */
  //   Click button to login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(theCodeItself);
    if (!email || !password || code !== theCodeItself) {
      console.log("I cannot be empty");
      console.log(theCodeItself);
    } else {
      try {
        console.log(theCodeItself);
        console.log(code);
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log(cred.user);
        navigate("/dashboard");
        setEmail("");
        setPassword("");
        setCode("");
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
