/** @format */

import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
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
      <Cart cart={cart} />
    </div>
  );
};

export default Shop;
