import React, { useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyAtynMRMVWi4Vit_KoOp-5s3TpBdeyg96w",
    authDomain: "makeene-auth.firebaseapp.com",
    projectId: "makeene-auth",
    storageBucket: "makeene-auth.appspot.com",
    messagingSenderId: "360639341716",
    appId: "1:360639341716:web:f689c504ac4893bebe4081",
  };

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const codeNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [countDown, setCountDown] = useState(20);
  const [getCode, setGetCode] = useState(codeNumbers);
  const [theCodeItself, setTheCodeItself] = useState(0);

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

  /* ========================== */
  /* On click of GetCode button */
  const handleGetCodeClick = () => {
    console.log("loaded as the barricade");
    getCurrentCode();
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
        codeNumbers,
        countDown,
        setCountDown,
        getCode,
        setGetCode,
        theCodeItself,
        setTheCodeItself,
        handleGetCodeClick,
        getCurrentCode,
        // handleGetCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
