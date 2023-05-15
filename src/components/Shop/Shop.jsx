/** @format */

import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import Header from "../Header/Header";
import { Link, useLoaderData } from "react-router-dom";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const pageNumbers = [...Array(totalPages).keys()];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );

      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  // handle add to cart
  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        // step 1: get id
        for (const id in storedCart) {
          // step 2: find product by using id
          const addedProduct = cartProducts?.find(
            (product) => product._id === id
          );
          //step 3: set the quantity
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the addedProduct in an array
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    let newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };
  //   console.log(cart);

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 15, 20];
  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }

  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">Review order</Link>
        </Cart>
      </div>

      {/* pagination */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            className={currentPage === number ? "selected" : ""}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
