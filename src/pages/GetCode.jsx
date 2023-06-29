import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const GetCode = () => {
  const {
    countDown,
    setCountDown,
    setGetCode,
    theCodeItself,
    setTheCodeItself,
    handleGetCodeClick,
    getCurrentCode,
  } = useGlobalContext();

  useEffect(() => {
    // countdown functionality
    const timer = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          return 20;
        }
        return prevCountDown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ===================== */
  // To make the code show everytime countDown reach 0
  useEffect(() => {
    if (countDown === 0) {
      handleGetCodeClick();
    }
  }, [countDown]);

  /* ===================== */
  // To make the code show on first render of the page
  useEffect(() => {
    handleGetCodeClick();
  }, []);

  useEffect(() => {
    console.log(theCodeItself);
  }, [theCodeItself]);

  return (
    <>
      <main className="get-code">
        <h2>Get Code Here:</h2>
        <input
          type="number"
          name="code"
          id="code"
          readOnly
          value={`${theCodeItself === "" ? "" : theCodeItself}`} //This allows the value take the required value and not the empty string of the initial state
        />
        <span>{countDown}s</span>
      </main>
    </>
  );
};

export default GetCode;
