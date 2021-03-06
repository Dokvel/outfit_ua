/**
 * Created by alex on 09.10.16.
 */

export const ADD_TO_CART = 'ADD_TO_CART';
export const REPLACE_CART = 'REPLACE_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const CACHE_KEY = 'CART';

export function addToCart(productCuid, colorCode, sizeKey) {
  return {
    type: ADD_TO_CART,
    productCuid, colorCode, sizeKey
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
