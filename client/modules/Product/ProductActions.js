/**
 * Created by alex on 15.09.16.
 */
import callApi, { callApiForm } from '../../util/apiCaller';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REPLACE_PRODUCT = 'REPLACE_PRODUCT';

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function replaceProduct(product) {
  return {
    type: REPLACE_PRODUCT,
    product,
  };
}

export function fetchProducts() {
  return (dispatch) => {
    return callApi('products').then(res => {
      dispatch(addProducts(res.products));
    });
  };
}

export function addProductRequest(form) {
  return (dispatch) => {
    return callApiForm('products', 'post', form).then(res => dispatch(addProduct(res.product)));
  };
}

export function updateProductRequest(cuid, form) {
  return (dispatch) => {
    return callApiForm('products/' + cuid, 'put', form).then(res => dispatch(replaceProduct(res.product)));
  };
}
