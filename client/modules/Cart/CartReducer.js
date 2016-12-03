/**
 * Created by alex on 09.10.16.
 */
import {ADD_TO_CART, REPLACE_CART, CACHE_KEY, REMOVE_FROM_CART} from './CartActions';
import {getProduct} from '../Product/ProductReducer';
import {getColorUuid} from '../../util/productHelpers';

// Initial State
const initialState = {};

const CartReducer = (state = initialState, action) => {
  let newCart;
  let path;
  switch (action.type) {

    case ADD_TO_CART:
      newCart = state; //return current state
      path = generateProductPath(action);
      if (state[path]) {
        let product = state[path];
        newCart = {
          ...state,
          [path]: {...product, count: product.count + 1}
        };
      } else {
        newCart = {
          ...state,
          [path]: {count: 1}
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REMOVE_FROM_CART:
      newCart = state;//return current state
      path = generateProductPath(action);
      if (state[path]) {
        let product = state[path];
        delete state[path];
        if (product.count < 2) {
          newCart = {...state}
        } else {
          newCart = {
            ...state,
            [path]: {...product, count: product.count - 1}
          }
        }
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REPLACE_CART:
      return action.cart || state;

    default:
      return state;
  }
};

export const generateProductPath = (params) => {
  return `${params.productCuid}_${params.colorCode}_${params.sizeKey}`;
};

export const parseProductPath = (path = '') => {
  let parsedPath = path.split('_');
  return {productCuid: parsedPath[0], colorCode: parsedPath[1], sizeKey: parsedPath[2]};
};


/* Selectors */

// Get all products
export const getCart = state => state.cart;

export const getProductsCount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    return sum + parseFloat(state.cart[key].count);
  }, 0);
};

export const getOrdersAmount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    let params = parseProductPath(key);
    let product = getProduct(state, params.productCuid);
    if (!product) return sum;
    return sum + parseFloat(state.cart[key].count) * product.price;
  }, 0);
};

// Export Reducer
export default CartReducer;
