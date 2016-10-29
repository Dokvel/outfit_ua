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
export const getProducts = (state, group = '', category = '') => {
  const isSale = group === 'sale';
  if (!isSale && group === '' && category === '') {
    return state.products.data;
  } else {
    if (isSale) {
      if (category !== '') {
        return state.products.data.filter(product => product.isSale === true && product.category === category);
      } else {
        return state.products.data.filter(product => product.isSale === true);
      }
    } else if (group !== '' && category !== '') {
      return state.products.data.filter(product => product.group === group && product.category === category);
    } else if (group !== '') {
      return state.products.data.filter(product => product.group === group);
    } else if (category !== '') {
      return state.products.data.filter(product => product.category === category);
    } else {
      return state.products.data;
    }
  }
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
