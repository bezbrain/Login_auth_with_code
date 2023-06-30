import React, { useContext, useState, useEffect } from "react";
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

  const getRandumNumber = () => {
    return Math.floor(Math.random() * codeNumbers.length);
  };

  const getCurrentCode = () => {
    let concat = "";
    for (let i = 0; i < 6; i++) {
      concat += getCode[getRandumNumber()];
    }
    console.log(concat);
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
      // console.log(myCode);
      setSnapshotData(myCode);
    });
  };

  const checkForDataInDb = () => {
    // onSnapshot(colRef, (snapshot) => {
    //   const dataArrFromDb = snapshot.docs.map((each) => {
    //     const docRef = doc(db, "login", each.id);
    //     // console.log(each);
    //     return docRef;
    //     // return (each.data());
    //   });
    //   console.log(dataArrFromDb);
    // });
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
        checkForDataInDb,
        snapshotData,
        setSnapshotData,
        getDbCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
