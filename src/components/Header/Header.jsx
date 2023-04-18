/** @format */

import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const Header = () => {
  const { user, userLogOut } = useContext(AuthContext);
  // console.log(user?.email);
  return (
    <>
      <nav className="header">
        <img src={logo} alt="" />
        <div className="nav-items">
          <Link to="/">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
          {user && (
            <div>
              <span>Welcome {user?.email}</span>
              <button className="btn" onClick={() => userLogOut()}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
