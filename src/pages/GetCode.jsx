import { useEffect } from "react";
import { useGlobalContext } from "../context";

const GetCode = () => {
  const {
    countDown,
    setCountDown,
    theCodeItself,
    getCurrentCode,
    countdownValue,
    colRef,
    addDoc,
    deleteDoc,
    db,
    doc,
    snapshotData,
    getDbCode,
    checkIfUserIsLoggedIn,
  } = useGlobalContext();

  /*============================================================ */
  // Function to generate code on click of the "Generate Code btn
  const handleGenerateCode = async () => {
    try {
      const codeConcatinated = await getCurrentCode();
      setCountDown(countdownValue);
      secondsCountdown();
      deleteWhenCountdownIsZero(); //calling delete function to make sure prev code deletes from db
      await addDoc(colRef, { number: codeConcatinated });
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    getDbCode(); // Call the function to have access to the db
  }, []);

  /* ========================================= */
  // Delete code from db when countdown reaches 0
  const deleteWhenCountdownIsZero = async () => {
    snapshotData.forEach((each) => {
      const docRef = doc(db, "login", each.id);
      deleteDoc(docRef);
    });
  };

  useEffect(() => {
    if (countDown === 0 || checkIfUserIsLoggedIn) {
      deleteWhenCountdownIsZero();
    }
  }, [countDown, checkIfUserIsLoggedIn]);

  /* ===================== */
  // countdown functionality
  const secondsCountdown = () => {
    const timer = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0 || checkIfUserIsLoggedIn) {
          clearInterval(timer); // Clear the interval when countdown reaches 0
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
