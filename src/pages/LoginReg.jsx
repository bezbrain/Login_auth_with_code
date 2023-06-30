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
    theCodeItself,
    setTheCodeItself,
    onSnapshot,
    colRef,
    getDoc,
    doc,
    db,
    deleteDoc,
    countDown,
    snapshotData,
    setSnapshotData,
    getDbCode,
    // checkForDataInDb,
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

  // const checkForDataInDb = () => {
  //   onSnapshot(colRef, (snapshot) => {
  //     const dataArrFromDb = snapshot.docs.map((each) => {
  //       const docRef = doc(db, "login", each.id);
  //       // console.log(each);
  //       // return docRef;
  //       return each.data();
  //     });
  //     console.log(dataArrFromDb);
  //   });
  // };
  // checkForDataInDb();

  /* ============================== */
  /* ============================== */
  //   Click button to login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // checkForDataInDb();

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
