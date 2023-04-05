/** @format */

import React from "react";
import "./ReviewItem.css";
import { getShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, handleDelete }) => {
  const { id, name, price, shipping, quantity, ratings, img } = product;
  //   console.log(product);

  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details">
        <div>
          <h4>{name}</h4>
          <p>
            Price: <span>${price}</span>
          </p>
          <p>
            Shipping charge: <span>${shipping}</span>
          </p>
          <p>
            Quantity : <span>{quantity}</span>
          </p>
        </div>
        <button onClick={() => handleDelete(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
