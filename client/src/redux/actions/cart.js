import axios from "axios";
import { CART_ADD_ITEM } from "../actionTypes";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      id: data._id,
      qty,
    },
  });

  //  store cartItems in the localStorage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
