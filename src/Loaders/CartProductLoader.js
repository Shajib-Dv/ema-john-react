/** @format */

import { getShoppingCart } from "../utilities/fakedb";

const CartProductLoader = async () => {
  const loadProduct = await fetch("products.json");
  const product = await loadProduct.json();

  const cart = [];
  const storedProduct = getShoppingCart();
  //   console.log(storedProduct);
  for (const id in storedProduct) {
    const savedProduct = product.find((pd) => pd.id === id);
    if (savedProduct) {
      const quantity = storedProduct[id];
      savedProduct.quantity = quantity;
    }
    cart.push(savedProduct);
  }
  return cart;
};

export { CartProductLoader };
