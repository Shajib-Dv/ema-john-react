/** @format */

import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const Header = () => {
  const { user, userLogOut } = useContext(AuthContext);
  console.log(user?.email);
  return (
    <>
      <nav className="header">
        <img src={logo} alt="" />
        <div className="nav-items">
          <Link to="/">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/login">Login</Link>
          {user ? (
            <div>
              <span>{user?.email}</span>
              <button onClick={() => userLogOut()}>Sign out</button>
            </div>
          ) : (
            <Link to="/signup">Sign up</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
