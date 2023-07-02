import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import AuthMesaage from "./AuthMesaage";

const Login = ({ Register, clickToReg, handleLoginSubmitProp }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    loginSuccess,
    loginError,
    caughtError,
  } = useGlobalContext();

  return (
    <>
      <form
        className={`login ${!Register ? "" : "add-css"}`}
        onSubmit={handleLoginSubmitProp}
      >
        <h2>Login</h2>

        {loginSuccess ? (
          // {/* Success Message */}
          <div
            className={`message ${
              loginError ? "add-message-css add-success-color" : ""
            }`}
          >
            <AuthMesaage message="Login successful" />
          </div>
        ) : (
          // {/* Error Message */}
          <div
            className={`message ${
              loginError ? "add-message-css add-error-color" : ""
            }`}
          >
            <AuthMesaage message="No field should be empty" />
          </div>
        )}
        {caughtError && (
          <div className="firebase-message">
            <AuthMesaage message={caughtError} />
          </div>
        )}

        <div className="email">
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="code">
          <input
            type="number"
            name="code"
            id="code"
            placeholder="Input Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Link
          to="/getcode"
          target="_blank"
          rel="noopener noreferrer"
          // onClick={handleGetCodeClick}
        >
          Get code
        </Link>
        <div className="login-btn-con">
          <button type="submit">Login</button>
        </div>
        <div className="dont-have-acc">
          <p>Don't have an account?</p>
          <p onClick={clickToReg}>Register</p>
        </div>
      </form>
    </>
  );
};

export default Login;
