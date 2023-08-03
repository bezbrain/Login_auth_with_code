import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";

import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AppContext = React.createContext();

const API_KEY = import.meta.env.VITE_API_KEY;

export const AppProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "makeene-auth.firebaseapp.com",
    projectId: "makeene-auth",
    storageBucket: "makeene-auth.appspot.com",
    messagingSenderId: "360639341716",
    appId: "1:360639341716:web:f689c504ac4893bebe4081",
  };

  initializeApp(firebaseConfig);

  const db = getFirestore();
  const auth = getAuth();

  const colRef = collection(db, "login");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const countdownValue = 20;

  const codeNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [countDown, setCountDown] = useState(countdownValue);
  const [getCode, setGetCode] = useState(codeNumbers);
  const [theCodeItself, setTheCodeItself] = useState(0);

  const [snapshotData, setSnapshotData] = useState([]);

  const [regError, setRegError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [caughtError, setCaughtError] = useState("");

  const [checkIfUserIsLoggedIn, setCheckIfUserIsLoggedIn] = useState("");

  const getRandumNumber = () => {
    return Math.floor(Math.random() * codeNumbers.length);
  };

  const getCurrentCode = () => {
    let concat = "";
    for (let i = 0; i < 6; i++) {
      concat += getCode[getRandumNumber()];
    }
    setTheCodeItself(concat);
    return concat;
  };

  const getDbCode = () => {
    onSnapshot(colRef, (snapshot) => {
      const myCode = snapshot.docs.map((each) => {
        return {
          ...each.data(),
          id: each.id,
        };
      });
      setSnapshotData(myCode);
    });
  };

  return (
    <AppContext.Provider
      value={{
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
        getAuth,
        firebaseConfig,
        initializeApp,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        auth,
        addDoc,
        colRef,
        onSnapshot,
        getDoc,
        doc,
        db,
        deleteDoc,
        codeNumbers,
        countdownValue,
        countDown,
        setCountDown,
        getCode,
        setGetCode,
        theCodeItself,
        setTheCodeItself,
        getCurrentCode,
        snapshotData,
        setSnapshotData,
        getDbCode,
        regError,
        setRegError,
        loginError,
        setLoginError,
        regSuccess,
        setRegSuccess,
        loginSuccess,
        setLoginSuccess,
        caughtError,
        setCaughtError,
        checkIfUserIsLoggedIn,
        setCheckIfUserIsLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
