/** @format */

import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import Header from "../Header/Header";
const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id
    for (const id in storedCart) {
      // step 2: find product by using id
      const addedProduct = products?.find((product) => product.id === id);
      //step 3: set the quantity
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4: add the addedProduct in an array
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);
  // handle add to cart

  const handleAddToCart = (product) => {
    let newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };
  //   console.log(cart);

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <Cart cart={cart} />
    </div>
  );
};

export default Shop;
