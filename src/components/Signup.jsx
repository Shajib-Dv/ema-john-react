/** @format */

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Providers/AuthProvider";

const Signup = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);
  //handle sign up
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirmPassword.value;

    // validation
    setError("");
    if (password !== confirm) {
      setError("Password did not match !");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add a capital letter");
      return;
    } else if (!/(?=.[0-9].*[0-9])/.test(password)) {
      setError("Please add two number");
      return;
    }
    // console.log(email, password, confirm);

    // create new user
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Sign up</h2>
      <form onSubmit={handleSignUp}>
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
        <div className="form-control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            required
            placeholder="Retype your password"
          />
        </div>
        {error && <small>{error}</small>}
        <br />
        <input type="submit" value="Sign up" className="btn-submit" />
      </form>
      <small>
        Already have an account ? <Link to="/login">Log in</Link>
      </small>
    </div>
  );
};

export default Signup;
