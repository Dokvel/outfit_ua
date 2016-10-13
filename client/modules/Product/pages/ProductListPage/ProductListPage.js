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
          <CategoriesBar {...this.props} onSelect={cuid=>alert(cuid)}/>
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
function mapStateToProps(state) {
  return {
    categories: getCategories(state),
    products: getProducts(state),
  };
}

export default connect(mapStateToProps)(ProductListPage);
