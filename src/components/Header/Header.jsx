/** @format */

import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
const Header = () => {
  return (
    <>
      <nav className="header">
        <img src={logo} alt="" />
        <div className="nav-items">
          <a href="/order">Order</a>
          <a href="/orderReview">Order Review</a>
          <a href="/manageInventory">Manage Inventory</a>
          <a href="/lonIn">Log In</a>
        </div>
      </nav>
    </>
  );
};

export default Header;
