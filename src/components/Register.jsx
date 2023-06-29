import { useGlobalContext } from "../context";

const Register = ({ Login, clickToLogin, handleRegSubmitProp }) => {
  const {
    regName,
    setRegName,
    regEmail,
    setRegEmail,
    regPassword,
    setRegPassword,
  } = useGlobalContext();

  return (
    <>
      <form
        className={`register ${Login ? "" : "add-css"}`}
        onSubmit={handleRegSubmitProp}
      >
        <h2>Register</h2>
        <div className="reg-name">
          <label htmlFor="">Name</label>
          <br />
          <input
            type="text"
            name="reg-name"
            id="reg-name"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
        </div>
        <div className="reg-email">
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            name="reg-email"
            id="reg-email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
        </div>
        <div className="reg-password">
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            name="reg-password"
            id="reg-password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
        </div>
        <div className="reg-btn-con">
          <button type="submit">Register</button>
        </div>
        <div className="have-acc">
          <p>Have an account?</p>
          <p onClick={clickToLogin}>Login</p>
        </div>
      </form>
    </>
  );
};

export default Register;
