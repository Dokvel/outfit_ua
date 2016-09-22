/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import products from './modules/Product/ProductReducer';
import intl from './modules/Intl/IntlReducer';
import categories from './modules/Category/CategoryReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  products,
  categories
});