/** @format */

import { json } from "react-router-dom";
import { getShoppingCart } from "../utilities/fakedb";

const storedProduct = getShoppingCart();
const ids = Object.keys(storedProduct);

const CartProductLoader = async () => {
  const loadProduct = await fetch(`http://localhost:5000/productsByIds`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ids),
  });
  const product = await loadProduct.json();

  const cart = [];
  //   console.log(storedProduct);
  for (const id in storedProduct) {
    const savedProduct = product.find((pd) => pd._id === id);
    if (savedProduct) {
      const quantity = storedProduct[id];
      savedProduct.quantity = quantity;
    }
    cart.push(savedProduct);
  }
  return cart;
};

export { CartProductLoader };
