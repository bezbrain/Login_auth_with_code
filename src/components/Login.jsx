import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import { useEffect } from "react";

const Login = ({ Register, clickToReg, handleLoginSubmitProp }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    code,
    setCode,
    handleGetCodeClick,
    theCodeItself,
  } = useGlobalContext();

  return (
    <>
      <form
        className={`login ${!Register ? "" : "add-css"}`}
        onSubmit={handleLoginSubmitProp}
      >
        <h2>Login</h2>
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
          onClick={handleGetCodeClick}
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
