/** @format */

import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItem/ReviewItem";
import { getShoppingCart, removeFromDb } from "../../utilities/fakedb";

const Orders = () => {
  const product = useLoaderData();
  //   console.log(product);
  const [cart, setCart] = useState(product);

  const handleDelete = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((p) => (
          <ReviewItem key={p.id} product={p} handleDelete={handleDelete} />
        ))}
      </div>

      <Cart cart={cart} />
    </div>
  );
};

export default Orders;
