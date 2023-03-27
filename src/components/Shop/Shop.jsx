/** @format */

import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // handle add to cart

  const productAddToCart = (product) => {
    let newCart = [...cart, product];
    setCart(newCart);
  };
  //   console.log(cart);

  const totalPrice = cart?.reduce((prev, current) => prev + current.price, 0);
  const totalShippingCost = cart?.reduce(
    (prev, current) => prev + current.shipping,
    0
  );
  const grandTotal = totalPrice + totalShippingCost;

  const tax = () => {
    if (totalPrice > 1000 && totalPrice < 9999) {
      return 200;
    } else if (totalPrice > 10000) {
      return 500;
    }
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            productAddToCart={productAddToCart}
          />
        ))}
      </div>
      <div className="cart-container">
        <h3>Order Summary</h3>
        <p>Selected Order : {cart?.length}</p>
        <p>Total price : ${totalPrice}</p>
        <p>Total shipping cost : ${totalShippingCost}</p>
        <p>Tax : ${tax() || 0}</p>
        <h3>Grand total : ${grandTotal}</h3>
      </div>
    </div>
  );
};

export default Shop;
