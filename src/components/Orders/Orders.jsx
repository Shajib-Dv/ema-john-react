/** @format */

import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import {
  deleteShoppingCart,
  getShoppingCart,
  removeFromDb,
} from "../../utilities/fakedb";

const Orders = () => {
  const product = useLoaderData();
  //   console.log(product);
  const [cart, setCart] = useState(product);

  const handleDelete = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((p) => (
          <ReviewItem key={p.id} product={p} handleDelete={handleDelete} />
        ))}
      </div>

      <Cart cart={cart} handleClearCart={handleClearCart}>
        <Link to="/checkout">Process checkout</Link>
      </Cart>
    </div>
  );
};

export default Orders;
