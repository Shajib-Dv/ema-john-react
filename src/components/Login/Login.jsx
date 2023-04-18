/** @format */

import React, { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const { userLogIn } = useContext(AuthContext);

  //handle log in

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    userLogIn(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Log in</h2>
      <form onSubmit={handleLogIn}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="Your email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Your password"
          />
        </div>
        {error && <small>{error}</small>}
        <br />
        <input type="submit" value="Log in" className="btn-submit" />
      </form>
      <small>
        New to ema-john ? <Link to="/signup">Sign up</Link>
      </small>
    </div>
  );
};

export default Login;
