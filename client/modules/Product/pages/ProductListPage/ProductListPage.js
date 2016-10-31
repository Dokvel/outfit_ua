/**
 * Created by alex on 15.09.16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';
import { getCategories } from '../../../Category/CategoryReducer';

import CategoriesBar from '../../../../components/CategoriesBar/CategoriesBar';
import { addToCart } from '../../../Cart/CartActions'

class ProductListPage extends Component {
  addProductToCart = (cuid) => {
    this.props.dispatch(addToCart(cuid))
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <CategoriesBar {...this.props}/>
        </div>
        <div className={styles.products}>
          {
            this.props.products.map(product=>(
              <div key={product.cuid} className={styles.product}>
                <ProductListItem key={product.cuid} {...product}
                                 addProductToCart={this.addProductToCart.bind(null, product.cuid)}/>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  let productsList = getProducts(state, props.params.groupKey, props.params.categoryKey);
  let groupProducts = getProducts(state, props.params.groupKey);
  let categoriesUUIDs = groupProducts.map(product => product.category).filter((x, i, a) => a.indexOf(x) == i);
  let categories = getCategories(state).filter(category => categoriesUUIDs.indexOf(category.cuid) > -1);

  return {
    categories,
    products: productsList
  };
}

export default connect(mapStateToProps)(ProductListPage);
