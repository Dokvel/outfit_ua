/**
 * Created by alex on 09.10.16.
 */

import callApi  from '../../util/apiCaller';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REPLACE_CART = 'REPLACE_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const CACHE_KEY = 'CART';

export function addToCart(productCuid, colorCode, sizeKey) {
  return {
    type: ADD_TO_CART,
    productCuid, colorCode, sizeKey
  };
}

export function sendCart(phone, cart) {
  return (dispatch) => {
    return callApi('products/order', 'post', { phone, cart }).then(res => dispatch({
      type: CLEAR_CART
    }));
  };
}

export function removeFromCart(productCuid, colorCode, sizeKey) {
  return {
    type: REMOVE_FROM_CART,
    productCuid, colorCode, sizeKey
  };
}

export function restoreCartFromCache() {
  let cartRaw = localStorage.getItem(CACHE_KEY);
  let cart;
  if (cartRaw !== null) {
    cart = JSON.parse(cartRaw);
  }
  return {
    type: REPLACE_CART,
    cart
  };
}
