import { ADD_PRODUCTS, ADD_PRODUCT, REPLACE_PRODUCT } from './ProductActions';

// Initial State
const initialState = { data: [] };

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCTS:
      return {
        data: action.products,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };
    case REPLACE_PRODUCT:
      return {
        ...state,
        data: state.data.map(obj => action.product.cuid === obj.cuid ? action.product : obj),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getProducts = (state, isSale = false, group = '') => {
  if (isSale) {
    return state.products.data.filter(product => product.isSale === true);
  } else if (group !== '') {
    return state.products.data.filter(product => product.group === group);
  } else {
    return state.products.data;
  }
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
