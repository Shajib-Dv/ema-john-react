/** @format */

import React from "react";
import "./Cart.css";
const Cart = ({ cart }) => {
  // console.log(cart);

  const totalPrice = cart?.reduce((prev, current) => prev + current.price, 0);
  const totalShippingCost = cart?.reduce(
    (prev, current) => prev + current.shipping,
    0
  );
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + totalShippingCost + tax;

  return (
    <>
      <div className="cart-container">
        <div className="summary-items">
          <h3>Order Summary</h3>
          <p>Selected Order : {cart?.length}</p>
          <p>Total price : ${totalPrice}</p>
          <p>Total shipping cost : ${totalShippingCost}</p>
          <p>Tax : ${tax.toFixed(2) || 0}</p>
          <h3>Grand total : ${grandTotal}</h3>
        </div>
      </div>
    </>
  );
};

export default Cart;
