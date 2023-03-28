/** @format */

import React from "react";
import "./Cart.css";
const Cart = ({ cart }) => {
  // console.log(cart);

  let totalPrice = 0;
  let totalShippingCost = 0;
  let quantity = 0;
  for (const product of cart) {
    product.quantity = product.quantity || 1;
    quantity = quantity + product.quantity;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShippingCost = totalShippingCost + product.shipping * product.quantity;
  }
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + totalShippingCost + tax;

  return (
    <>
      <div className="cart-container">
        <div className="summary-items">
          <h3>Order Summary</h3>
          <p>Selected Order : {quantity}</p>
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
