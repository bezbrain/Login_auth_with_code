import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const GetCode = () => {
  const {
    countDown,
    setCountDown,
    setGetCode,
    theCodeItself,
    setTheCodeItself,
    getCurrentCode,
    countdownValue,
    colRef,
    addDoc,
    deleteDoc,
    db,
    doc,
    snapshotData,
    getDbCode,
  } = useGlobalContext();

  /*============================================================ */
  // Function to generate code on click of the "Generate Code btn
  const handleGenerateCode = async () => {
    try {
      const codeConcatinated = await getCurrentCode();
      console.log(codeConcatinated);
      setCountDown(countdownValue);
      secondsCountdown();
      await addDoc(colRef, { number: codeConcatinated });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDbCode(); // Call the function to have access to the db
    // console.log(snapshotData);
  }, []);

  /* ========================================= */
  // Delete code from db when countdown reaches 0
  const deleteWhenCountdownIsZero = async () => {
    // console.log(snapshotData);
    snapshotData.forEach((each) => {
      console.log(each.id);
      const docRef = doc(db, "login", each.id);
      deleteDoc(docRef);
    });
  };

  useEffect(() => {
    // console.log(snapshotData);
    if (countDown === 0) {
      deleteWhenCountdownIsZero();
      console.log("I am zero");
    }
  }, [countDown]);

  /* ===================== */
  // countdown functionality
  const secondsCountdown = () => {
    const timer = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(timer); // Clear the interval when countdown reaches 0
          // deleteDoc(db, "login")
          return 0;
        }
        return prevCountDown - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  };

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
        <br />
        <button className="gen-code-btn" onClick={handleGenerateCode}>
          Generate Code
        </button>
      </main>
    </>
  );
};

export default GetCode;
